const db = require('../db/db');

class OptimizedTimetableGenerator {
  constructor() {
    this.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
    this.maxAttempts = 15;
    this.breaks = ['12:15-14:00'];
    this.minSessionsPerDay = 2;

    this.sessionDistribution = {
      primaire: { sessionsPerDay: 4, maxHoursPerDay: 4 },
      moyen: { sessionsPerDay: 6, maxHoursPerDay: 6 },
      lycee: { sessionsPerDay: 6, maxHoursPerDay: 6 }
    };

    this.timeslots = {
      short: ['8:00-9:00', '9:00-10:00', '10:15-11:15', '11:15-12:15', '14:00-15:00', '15:00-16:00'],
      long: ['8:00-10:00', '10:15-12:15', '14:00-16:00']
    };

    this.globalTeacherSchedule = new Map();
    this.globalClassroomSchedule = new Map();
    this.globalGroupSchedule = new Map();
    this.conflictResolutionAttempts = 0;
    this.maxConflictResolutionAttempts = 3;
  }

  async generateAllTimetables() {
    try {
      console.log('🚀 Starting optimized timetable generation');
      
      const checkSchema = await db.query(`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_name = 'timetable' AND column_name = 'timeslot'
      `);
      
      if (checkSchema.rows[0].data_type !== 'tstzrange') {
        throw new Error('Database schema mismatch: timeslot column must be of type tstzrange');
      }

      const groups = await this.getAllGroups();
      if (!groups.length) {
        throw new Error('No groups found');
      }

      const sortedGroups = [...groups].sort((a, b) => {
        const priority = { lycee: 3, moyen: 2, primaire: 1 };
        return priority[b.level] - priority[a.level] || b.student_number - a.student_number;
      });

      const results = {};
      let successCount = 0;
      let failureCount = 0;

      for (const group of sortedGroups) {
        try {
          const result = await this.generateAndSaveGroupTimetable(group, true);
          results[group.id] = result;
          result.success ? successCount++ : failureCount++;
        } catch (error) {
          console.error(`Failed group ${group.id}:`, error.message);
          results[group.id] = { success: false, error: error.message };
          failureCount++;
        }
      }

      let conflicts = this.checkGlobalConflicts();
      while ((conflicts.teacherConflicts > 0 || 
             conflicts.classroomConflicts > 0 || 
             conflicts.groupConflicts > 0) && 
             this.conflictResolutionAttempts < this.maxConflictResolutionAttempts) {
        console.log(`Resolving conflicts (attempt ${this.conflictResolutionAttempts + 1})`);
        await this.resolveConflicts(results, sortedGroups);
        conflicts = this.checkGlobalConflicts();
        this.conflictResolutionAttempts++;
      }

      for (const group of sortedGroups) {
        if (results[group.id].success && results[group.id].unassigned.length > 0) {
          try {
            const result = await this.tryAssignRemainingSessions(group, results[group.id]);
            if (result.success) {
              results[group.id] = result;
            }
          } catch (error) {
            console.error(`Failed final assignment for group ${group.id}:`, error);
          }
        }
      }

      return {
        success: true,
        totalGroups: groups.length,
        successCount: Object.values(results).filter(r => r.success).length,
        failureCount: Object.values(results).filter(r => !r.success).length,
        results,
        globalConflicts: this.checkGlobalConflicts(),
        summary: this.generateSummary(results)
      };
    } catch (error) {
      console.error('Global generation failed:', error);
      return { success: false, error: error.message };
    }
  }

  async resolveConflicts(results, groups) {
    for (const group of groups) {
      if (!results[group.id]?.success) continue;
      
      const { timetable } = results[group.id];
      const conflicts = this.findGroupConflicts(group.id, timetable);

      if (conflicts.length > 0) {
        console.log(`🛠 Resolving ${conflicts.length} conflicts for group ${group.id}`);
        const newTimetable = await this.rebuildGroupTimetable(group, timetable);
        results[group.id].timetable = newTimetable;
        this.updateGlobalSchedules(group.id, newTimetable);
      }
    }
  }

  async rebuildGroupTimetable(group, oldTimetable) {
    const keptSessions = {};
    this.days.forEach(day => { keptSessions[day] = [] });

    const subjects = await this.getGroupSubjects(group);
    const newTimetable = this.initializeTimetable();
    const tracker = this.createAssignmentTracker(subjects);

    for (const day of this.days) {
      for (const session of oldTimetable[day]) {
        if (!this.isSessionConflicting(session, group.id)) {
          newTimetable[day].push(session);
          const trackerItem = tracker.find(t => t.subjectId === session.subject_id);
          if (trackerItem) trackerItem.assigned++;
          this.updateGlobalSchedulesForSession(
            group.id,
            session.teacher_id,
            session.classroom_id,
            day,
            session.timeslot,
            session.duration,
            `${group.id}-${day}-${session.timeslot}`
          );
        }
      }
    }

    await this.assignSessions(group, subjects, newTimetable, tracker, false);
    return newTimetable;
  }

  isSessionConflicting(session, groupId) {
    return (
      this.isTeacherBusyGlobally(session.teacher_id, session.day, session.timeslot, session.duration, `${groupId}-${session.day}-${session.timeslot}`) ||
      this.isClassroomBusyGlobally(session.classroom_id, session.day, session.timeslot, session.duration, `${groupId}-${session.day}-${session.timeslot}`) ||
      this.isGroupBusyGlobally(groupId, session.day, session.timeslot, session.duration, `${groupId}-${session.day}-${session.timeslot}`)
    );
  }

  findGroupConflicts(groupId, timetable) {
    const conflicts = [];
    for (const day of this.days) {
      for (const session of timetable[day]) {
        if (this.isSessionConflicting(session, groupId)) {
          conflicts.push(session);
        }
      }
    }
    return conflicts;
  }

  async getAllGroups() {
    const { rows } = await db.query(`
      SELECT g.*, gr.level, gr.name AS grade_name, s.name AS specialization_name
      FROM groups g
      JOIN grades gr ON g.grade_id = gr.id
      LEFT JOIN specializations s ON g.specialization_id = s.id
      WHERE g.student_number > 0
      ORDER BY gr.level DESC, g.id
    `);
    return rows;
  }

  async generateAndSaveGroupTimetable(group, strictMode = true) {
    console.log(`Generating timetable for group ${group.id} (${group.level})`);
    
    const subjects = await this.getGroupSubjects(group);
    const timetable = this.initializeTimetable();
    const tracker = this.createAssignmentTracker(subjects);

    await this.assignSessions(group, subjects, timetable, tracker, strictMode);
    this.validateTimetable(timetable);
    this.logResults(group.id, tracker);

    await this.saveTimetableToDatabase(group.id, timetable);

    return {
      success: true,
      timetable,
      unassigned: this.getUnassignedSessions(tracker)
    };
  }

  async saveTimetableToDatabase(groupId, timetable) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('SET LOCAL statement_timeout = 30000');
      
      await client.query('DELETE FROM timetable WHERE group_id = $1', [groupId]);

      for (const [day, sessions] of Object.entries(timetable)) {
        for (const session of sessions) {
          try {
            this.validateSession(session);
            
            const [startTime, endTime] = session.timeslot.split('-');
            await client.query(`
              INSERT INTO timetable 
              (group_id, subject_id, teacher_id, classroom_id, day, timeslot, duration)
              VALUES ($1, $2, $3, $4, $5, 
                tstzrange(
                  (CURRENT_DATE + ($6::time - '00:00'::time))::timestamp,
                  (CURRENT_DATE + ($7::time - '00:00'::time))::timestamp
                ), 
                $8
              )`, 
              [
                groupId, session.subject_id, session.teacher_id, 
                session.classroom_id, day, startTime, endTime, session.duration
              ]
            );
          } catch (err) {
            console.error(`Failed to save session for group ${groupId}:`, {
              day,
              timeslot: session.timeslot,
              error: err.message
            });
          }
        }
      }
      
      await client.query('COMMIT');
      console.log(`Successfully saved timetable for group ${groupId}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Transaction failed for group ${groupId}:`, error);
      throw error;
    } finally {
      client.release();
    }
  }

  validateSession(session) {
    if (!session.timeslot.match(/^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/)) {
      throw new Error(`Invalid timeslot format: ${session.timeslot}`);
    }
    if (!session.subject_id || !session.teacher_id || !session.classroom_id) {
      throw new Error('Missing required session fields');
    }
    if (session.duration <= 0) {
      throw new Error(`Invalid duration: ${session.duration}`);
    }
  }

  async getGroupSubjects(group) {
    const { rows } = await db.query(`
      SELECT s.*, gss.weekly_hours, gss.is_double_session
      FROM grade_subjects_specialization gss
      JOIN subjects s ON gss.subject_id = s.id
      WHERE gss.grade_id = $1 AND (gss.specialization_id = $2 OR gss.specialization_id IS NULL)
      ORDER BY s.classroom_type DESC, gss.weekly_hours DESC
    `, [group.grade_id, group.specialization_id]);
    return rows;
  }

  initializeTimetable() {
    return this.days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});
  }

  createAssignmentTracker(subjects) {
    return subjects.map(subject => ({
      subjectId: subject.id,
      name: subject.name,
      required: Math.ceil(subject.weekly_hours / (subject.is_double_session ? 2 : 1)),
      assigned: 0,
      attempts: 0
    }));
  }

  async assignSessions(group, subjects, timetable, tracker, strictMode) {
    const levelConfig = this.sessionDistribution[group.level];
    const teacherCache = new Map();
    const classroomCache = new Map();

    await this.assignMinimumSessions(group, subjects, timetable, tracker, levelConfig, teacherCache, classroomCache, strictMode);
    await this.assignRemainingSessions(group, subjects, timetable, tracker, levelConfig, teacherCache, classroomCache, strictMode);
  }

  async assignMinimumSessions(group, subjects, timetable, tracker, levelConfig, teacherCache, classroomCache, strictMode) {
    const sortedSubjects = this.sortSubjectsByPriority(subjects);

    for (const subject of sortedSubjects) {
      let teacher = await this.getCachedTeacher(group.id, subject.id, teacherCache);
      if (!teacher) continue;

      let classrooms = await this.getCachedClassrooms(group, subject, classroomCache);
      if (!classrooms.length) continue;

      const trackerItem = tracker.find(t => t.subjectId === subject.id);
      let remaining = Math.min(trackerItem.required, 2);

      while (trackerItem.attempts < this.maxAttempts && remaining > 0) {
        const assigned = await this.tryAssignSubjectSessions(
          group, subject, teacher, timetable, levelConfig, remaining, classrooms, true, strictMode
        );
        trackerItem.assigned += assigned;
        remaining -= assigned;
        trackerItem.attempts++;
      }
    }
  }

  async assignRemainingSessions(group, subjects, timetable, tracker, levelConfig, teacherCache, classroomCache, strictMode) {
    const sortedSubjects = this.sortSubjectsByPriority(subjects);

    for (const subject of sortedSubjects) {
      let teacher = await this.getCachedTeacher(group.id, subject.id, teacherCache);
      if (!teacher) continue;

      let classrooms = await this.getCachedClassrooms(group, subject, classroomCache);
      if (!classrooms.length) continue;

      const trackerItem = tracker.find(t => t.subjectId === subject.id);
      let remaining = trackerItem.required - trackerItem.assigned;

      while (trackerItem.attempts < this.maxAttempts && remaining > 0) {
        const assigned = await this.tryAssignSubjectSessions(
          group, subject, teacher, timetable, levelConfig, remaining, classrooms, false, strictMode
        );
        trackerItem.assigned += assigned;
        remaining -= assigned;
        trackerItem.attempts++;
      }
    }
  }

  sortSubjectsByPriority(subjects) {
    return [...subjects].sort((a, b) => {
      if (a.classroom_type !== 'class' && b.classroom_type === 'class') return -1;
      if (a.classroom_type === 'class' && b.classroom_type !== 'class') return 1;
      if (a.is_double_session && !b.is_double_session) return -1;
      if (!a.is_double_session && b.is_double_session) return 1;
      return b.weekly_hours - a.weekly_hours;
    });
  }

  async getCachedTeacher(groupId, subjectId, teacherCache) {
    if (!teacherCache.has(subjectId)) {
      const teacher = await this.getTeacherForSubject(groupId, subjectId);
      if (!teacher) {
        console.warn(`No teacher for subject ${subjectId} in group ${groupId}`);
        return null;
      }
      teacherCache.set(subjectId, teacher);
    }
    return teacherCache.get(subjectId);
  }

  async getCachedClassrooms(group, subject, classroomCache) {
    if (!classroomCache.has(subject.id)) {
      const classrooms = await this.getAvailableClassrooms(group, subject);
      if (!classrooms.length) {
        console.warn(`No classrooms available for ${subject.name}`);
        return [];
      }
      classroomCache.set(subject.id, classrooms);
    }
    return classroomCache.get(subject.id);
  }

  async tryAssignSubjectSessions(group, subject, teacher, timetable, levelConfig, required, classrooms, isMinimumPhase, strictMode = true) {
    let assignedCount = 0;
    const duration = subject.is_double_session ? 120 : 60;
    const shuffledDays = [...this.days].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < required; i++) {
      let assigned = false;
      
      for (const day of shuffledDays) {
        if (assigned) break;
        if (strictMode && this.hasSubjectOnDay(timetable[day], subject.id)) continue;
        if (this.getDayTotalHours(timetable[day]) + (duration/60) > levelConfig.maxHoursPerDay) continue;

        const timeslots = this.getTimeslotsForAssignment(group.level, duration, timetable[day], day);
        const shuffledTimeslots = [...timeslots].sort(() => Math.random() - 0.5);

        for (const timeslot of shuffledTimeslots) {
          if (assigned) break;
          if (this.isInBreak(timeslot)) continue;

          if (!this.isTeacherBusyGlobally(teacher.id, day, timeslot, duration) &&
              !this.isGroupBusyGlobally(group.id, day, timeslot, duration)) {
            
            const shuffledClassrooms = [...classrooms].sort(() => Math.random() - 0.5);
            for (const classroom of shuffledClassrooms) {
              if (!this.isClassroomBusyGlobally(classroom.id, day, timeslot, duration)) {
                const session = {
                  subject_id: subject.id,
                  subject_name: subject.name,
                  teacher_id: teacher.id,
                  teacher_name: `${teacher.first_name} ${teacher.last_name}`,
                  classroom_id: classroom.id,
                  classroom_name: classroom.name,
                  timeslot,
                  duration,
                  day
                };

                timetable[day].push(session);
                timetable[day].sort((a, b) => 
                  this.timeToMinutes(a.timeslot.split('-')[0]) - 
                  this.timeToMinutes(b.timeslot.split('-')[0])
                );

                assignedCount++;
                assigned = true;
                this.updateGlobalSchedulesForSession(
                  group.id,
                  teacher.id,
                  classroom.id,
                  day,
                  timeslot,
                  duration,
                  `${group.id}-${day}-${timeslot}`
                );
                break;
              }
            }
          }
        }
      }
    }
    return assignedCount;
  }

  async tryAssignRemainingSessions(group, currentResult) {
    const { timetable, unassigned } = currentResult;
    const subjects = await this.getGroupSubjects(group);
    const tracker = this.createAssignmentTracker(subjects);
    
    for (const day of Object.values(timetable)) {
      for (const session of day) {
        const trackerItem = tracker.find(t => t.subjectId === session.subject_id);
        if (trackerItem) trackerItem.assigned++;
      }
    }

    const remainingSubjects = subjects.filter(subject => 
      unassigned.some(u => u.name === subject.name)
    );

    if (remainingSubjects.length === 0) {
      return currentResult;
    }

    console.log(`Attempting to assign remaining sessions for group ${group.id}`);
    
    const levelConfig = this.sessionDistribution[group.level];
    const teacherCache = new Map();
    const classroomCache = new Map();

    for (const subject of remainingSubjects) {
      let teacher = await this.getCachedTeacher(group.id, subject.id, teacherCache);
      if (!teacher) continue;

      let classrooms = await this.getCachedClassrooms(group, subject, classroomCache);
      if (!classrooms.length) continue;

      const trackerItem = tracker.find(t => t.subjectId === subject.id);
      let remaining = trackerItem.required - trackerItem.assigned;

      while (trackerItem.attempts < this.maxAttempts && remaining > 0) {
        const assigned = await this.tryAssignSubjectSessions(
          group, subject, teacher, timetable, levelConfig, remaining, classrooms, false, false
        );
        trackerItem.assigned += assigned;
        remaining -= assigned;
        trackerItem.attempts++;
      }
    }

    await this.saveTimetableToDatabase(group.id, timetable);

    return {
      success: true,
      timetable,
      unassigned: this.getUnassignedSessions(tracker)
    };
  }

  isTeacherBusyGlobally(teacherId, day, timeslot, duration, excludeSessionId) {
    if (!this.globalTeacherSchedule.has(teacherId)) return false;
    const teacherSchedule = this.globalTeacherSchedule.get(teacherId);
    if (!teacherSchedule[day]) return false;

    const [start, end] = timeslot.split('-');
    const newStart = this.timeToMinutes(start);
    const newEnd = newStart + duration;

    for (const busySlot of teacherSchedule[day]) {
      if (excludeSessionId && busySlot.id === excludeSessionId) continue;
      const [busyStart, busyEnd] = busySlot.timeslot.split('-').map(this.timeToMinutes);
      if (newStart < busyEnd && newEnd > busyStart) return true;
    }
    return false;
  }

  isClassroomBusyGlobally(classroomId, day, timeslot, duration, excludeSessionId) {
    if (!this.globalClassroomSchedule.has(classroomId)) return false;
    const classroomSchedule = this.globalClassroomSchedule.get(classroomId);
    if (!classroomSchedule[day]) return false;

    const [start, end] = timeslot.split('-');
    const newStart = this.timeToMinutes(start);
    const newEnd = newStart + duration;

    for (const busySlot of classroomSchedule[day]) {
      if (excludeSessionId && busySlot.id === excludeSessionId) continue;
      const [busyStart, busyEnd] = busySlot.timeslot.split('-').map(this.timeToMinutes);
      if (newStart < busyEnd && newEnd > busyStart) return true;
    }
    return false;
  }

  isGroupBusyGlobally(groupId, day, timeslot, duration, excludeSessionId) {
    if (!this.globalGroupSchedule.has(groupId)) return false;
    const groupSchedule = this.globalGroupSchedule.get(groupId);
    if (!groupSchedule[day]) return false;

    const [start, end] = timeslot.split('-');
    const newStart = this.timeToMinutes(start);
    const newEnd = newStart + duration;

    for (const busySlot of groupSchedule[day]) {
      if (excludeSessionId && busySlot.id === excludeSessionId) continue;
      const [busyStart, busyEnd] = busySlot.timeslot.split('-').map(this.timeToMinutes);
      if (newStart < busyEnd && newEnd > busyStart) return true;
    }
    return false;
  }

  updateGlobalSchedules(groupId, timetable) {
    for (const [day, sessions] of Object.entries(timetable)) {
      for (const session of sessions) {
        this.updateGlobalSchedulesForSession(
          groupId,
          session.teacher_id,
          session.classroom_id,
          day,
          session.timeslot,
          session.duration,
          `${groupId}-${day}-${session.timeslot}`
        );
      }
    }
  }

  updateGlobalSchedulesForSession(groupId, teacherId, classroomId, day, timeslot, duration, sessionId) {
    const sessionRef = { id: sessionId || `${groupId}-${day}-${timeslot}`, timeslot, duration };

    if (!this.globalTeacherSchedule.has(teacherId)) {
      this.globalTeacherSchedule.set(teacherId, {});
    }
    if (!this.globalTeacherSchedule.get(teacherId)[day]) {
      this.globalTeacherSchedule.get(teacherId)[day] = [];
    }
    this.globalTeacherSchedule.get(teacherId)[day].push(sessionRef);

    if (!this.globalClassroomSchedule.has(classroomId)) {
      this.globalClassroomSchedule.set(classroomId, {});
    }
    if (!this.globalClassroomSchedule.get(classroomId)[day]) {
      this.globalClassroomSchedule.get(classroomId)[day] = [];
    }
    this.globalClassroomSchedule.get(classroomId)[day].push(sessionRef);

    if (!this.globalGroupSchedule.has(groupId)) {
      this.globalGroupSchedule.set(groupId, {});
    }
    if (!this.globalGroupSchedule.get(groupId)[day]) {
      this.globalGroupSchedule.get(groupId)[day] = [];
    }
    this.globalGroupSchedule.get(groupId)[day].push(sessionRef);
  }

  checkGlobalConflicts() {
    const conflicts = {
      teacherConflicts: 0,
      classroomConflicts: 0,
      groupConflicts: 0
    };

    for (const [teacherId, schedule] of this.globalTeacherSchedule.entries()) {
      for (const [day, timeslots] of Object.entries(schedule)) {
        for (let i = 0; i < timeslots.length; i++) {
          for (let j = i + 1; j < timeslots.length; j++) {
            const [start1, end1] = timeslots[i].timeslot.split('-').map(this.timeToMinutes);
            const [start2, end2] = timeslots[j].timeslot.split('-').map(this.timeToMinutes);
            
            if (start1 < end2 && end1 > start2) {
              conflicts.teacherConflicts++;
            }
          }
        }
      }
    }

    for (const [classroomId, schedule] of this.globalClassroomSchedule.entries()) {
      for (const [day, timeslots] of Object.entries(schedule)) {
        for (let i = 0; i < timeslots.length; i++) {
          for (let j = i + 1; j < timeslots.length; j++) {
            const [start1, end1] = timeslots[i].timeslot.split('-').map(this.timeToMinutes);
            const [start2, end2] = timeslots[j].timeslot.split('-').map(this.timeToMinutes);
            
            if (start1 < end2 && end1 > start2) {
              conflicts.classroomConflicts++;
            }
          }
        }
      }
    }

    for (const [groupId, schedule] of this.globalGroupSchedule.entries()) {
      for (const [day, timeslots] of Object.entries(schedule)) {
        for (let i = 0; i < timeslots.length; i++) {
          for (let j = i + 1; j < timeslots.length; j++) {
            const [start1, end1] = timeslots[i].timeslot.split('-').map(this.timeToMinutes);
            const [start2, end2] = timeslots[j].timeslot.split('-').map(this.timeToMinutes);
            
            if (start1 < end2 && end1 > start2) {
              conflicts.groupConflicts++;
            }
          }
        }
      }
    }

    return conflicts;
  }

  hasSubjectOnDay(daySessions, subjectId) {
    return daySessions.some(s => s.subject_id === subjectId);
  }

  getTimeslotsForAssignment(level, duration, daySessions, day) {
    const slots = duration === 120 ? this.timeslots.long : 
                 level === 'primaire' ? this.timeslots.short.slice(0, 4) : this.timeslots.short;
    
    return slots.filter(timeslot => {
      return this.isTimeslotAvailable(daySessions, timeslot, duration) && !this.isInBreak(timeslot);
    });
  }

  async getTeacherForSubject(groupId, subjectId) {
    const { rows } = await db.query(`
      SELECT e.* FROM enseignant e
      JOIN teacher_group_subjects tgs ON e.id = tgs.teacher_id
      WHERE tgs.group_id = $1 AND tgs.subject_id = $2
      LIMIT 1
    `, [groupId, subjectId]);
    return rows[0];
  }

  async getAvailableClassrooms(group, subject) {
    if (subject.classroom_type === 'class') {
      const { rows } = await db.query(`SELECT * FROM classrooms WHERE id = $1`, [group.class_id]);
      return rows;
    }
    const { rows } = await db.query(
      `SELECT * FROM classrooms WHERE type = $1 AND available = true`, [subject.classroom_type]
    );
    return rows;
  }

  isTimeslotAvailable(daySessions, timeslot, duration) {
    const [start] = timeslot.split('-');
    const newStart = this.timeToMinutes(start);
    const newEnd = newStart + duration;

    return !daySessions.some(session => {
      const [sStart] = session.timeslot.split('-');
      const sStartTime = this.timeToMinutes(sStart);
      const sEndTime = sStartTime + session.duration;
      return (newStart < sEndTime && newEnd > sStartTime);
    });
  }

  isInBreak(timeslot) {
    const [start, end] = timeslot.split('-').map(this.timeToMinutes);
    return this.breaks.some(b => {
      const [bStart, bEnd] = b.split('-').map(this.timeToMinutes);
      return start < bEnd && end > bStart;
    });
  }

  timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getDayTotalHours(daySessions) {
    return daySessions.reduce((total, session) => total + (session.duration / 60), 0);
  }

  validateTimetable(timetable) {
    for (const [day, sessions] of Object.entries(timetable)) {
      if (sessions.length < this.minSessionsPerDay) {
        console.warn(`Only ${sessions.length} session(s) scheduled on ${day}`);
      }

      let lastEnd = 0;
      for (const session of sessions) {
        const [start, end] = session.timeslot.split('-');
        const startMinutes = this.timeToMinutes(start);
        const endMinutes = this.timeToMinutes(end);
        
        if (startMinutes < lastEnd) {
          throw new Error(`Sessions out of order on ${day}`);
        }
        lastEnd = endMinutes;
      }
    }

    for (const [day, sessions] of Object.entries(timetable)) {
      for (let i = 0; i < sessions.length; i++) {
        for (let j = i + 1; j < sessions.length; j++) {
          const session1 = sessions[i];
          const session2 = sessions[j];
          
          const [start1] = session1.timeslot.split('-');
          const [start2] = session2.timeslot.split('-');
          const end1 = this.timeToMinutes(start1) + session1.duration;
          const end2 = this.timeToMinutes(start2) + session2.duration;
          
          if (this.timeToMinutes(start1) < end2 && end1 > this.timeToMinutes(start2)) {
            throw new Error(`Conflict detected on ${day} between ${session1.subject_name} and ${session2.subject_name}`);
          }
        }
      }
    }
  }

  logResults(groupId, tracker) {
    const unassigned = tracker.filter(t => t.assigned < t.required);
    if (unassigned.length > 0) {
      console.warn(`Unassigned sessions for group ${groupId}:`, unassigned.map(
        u => `${u.name} (${u.assigned}/${u.required})`
      ));
    } else {
      console.log(`All sessions assigned for group ${groupId}`);
    }
  }

  getUnassignedSessions(tracker) {
    return tracker.filter(t => t.assigned < t.required).map(({ name, assigned, required }) => ({ name, assigned, required }));
  }

  generateSummary(results) {
    const summary = {
      totalGroups: Object.keys(results).length,
      fullyAssigned: 0,
      partiallyAssigned: 0,
      failed: 0,
      totalUnassignedSessions: 0,
      groupsWithUnassigned: []
    };

    for (const [groupId, result] of Object.entries(results)) {
      if (!result.success) {
        summary.failed++;
        continue;
      }

      const unassignedCount = result.unassigned.length;
      if (unassignedCount === 0) {
        summary.fullyAssigned++;
      } else {
        summary.partiallyAssigned++;
        summary.totalUnassignedSessions += unassignedCount;
        summary.groupsWithUnassigned.push({
          groupId,
          unassigned: result.unassigned
        });
      }
    }

    return summary;
  }

  async getStudentTimetable(studentId) {
    try {
      // First get the student's group_id
      const studentQuery = await db.query(
        'SELECT group_id FROM eleve WHERE id = $1',
        [studentId]
      );
      
      if (studentQuery.rows.length === 0) {
        throw new Error('Student not found');
      }

      const groupId = studentQuery.rows[0].group_id;

      // Then get the timetable for that group
      const timetableQuery = await db.query(`
        SELECT 
          t.day,
          t.timeslot,
          t.duration,
          s.name AS subject_name,
          e.first_name AS teacher_first_name,
          e.last_name AS teacher_last_name,
          c.name AS classroom_name
        FROM timetable t
        JOIN subjects s ON t.subject_id = s.id
        JOIN enseignant e ON t.teacher_id = e.id
        JOIN classrooms c ON t.classroom_id = c.id
        WHERE t.group_id = $1
        ORDER BY 
          CASE t.day
            WHEN 'Dimanche' THEN 0
            WHEN 'Lundi' THEN 1
            WHEN 'Mardi' THEN 2
            WHEN 'Mercredi' THEN 3
            WHEN 'Jeudi' THEN 4
          END,
          t.timeslot
      `, [groupId]);

      // Format the timetable by day
      const formattedTimetable = {};
      timetableQuery.rows.forEach(row => {
        if (!formattedTimetable[row.day]) {
          formattedTimetable[row.day] = [];
        }
        formattedTimetable[row.day].push({
          timeslot: row.timeslot,
          duration: row.duration,
          subject: row.subject_name,
          teacher: `${row.teacher_first_name} ${row.teacher_last_name}`,
          classroom: row.classroom_name
        });
      });

      return {
        success: true,
        studentId,
        groupId,
        timetable: formattedTimetable
      };
    } catch (error) {
      console.error(`Error getting timetable for student ${studentId}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  async getTeacherTimetable(teacherId) {
    try {
      const { rows } = await db.query(`
        SELECT 
          t.day,
          TO_CHAR(LOWER(t.timeslot)::time, 'HH24:MI') || '-' || 
          TO_CHAR(UPPER(t.timeslot)::time, 'HH24:MI') AS timeslot,
          t.duration,
          s.name AS subject_name,
          g.name AS group_name,
          c.name AS classroom_name
        FROM timetable t
        JOIN subjects s ON t.subject_id = s.id
        JOIN groups g ON t.group_id = g.id
        JOIN classrooms c ON t.classroom_id = c.id
        WHERE t.teacher_id = $1
        ORDER BY 
          CASE t.day
            WHEN 'Dimanche' THEN 0
            WHEN 'Lundi' THEN 1
            WHEN 'Mardi' THEN 2
            WHEN 'Mercredi' THEN 3
            WHEN 'Jeudi' THEN 4
          END,
          LOWER(t.timeslot)
      `, [teacherId]);

      const formattedTimetable = rows.reduce((acc, row) => {
        if (!acc[row.day]) acc[row.day] = [];
        acc[row.day].push({
          timeslot: row.timeslot,
          subject: row.subject_name,
          group: row.group_name,
          classroom: row.classroom_name,
          duration: row.duration
        });
        return acc;
      }, {});

      return {
        success: true,
        teacherId,
        timetable: formattedTimetable
      };
    } catch (error) {
      console.error(`Error getting timetable for teacher ${teacherId}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new OptimizedTimetableGenerator();