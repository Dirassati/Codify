const timetableGenerator = require('../services/timetableGenerator');
const db = require('../db/db');

const dryRun = async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  const result = await timetableGenerator.generateForGroup(groupId);
  if (result.success) {
    res.status(200).json({
      message: 'Dry-run completed',
      timetable: result.timetable,
      unassigned: result.unassigned,
      warnings: result.warnings
    });
  } else {
    res.status(500).json({ error: result.error });
  }
};

const generateAndSave = async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    await db.query('DELETE FROM timetable WHERE group_id = $1', [groupId]);

    const result = await timetableGenerator.generateForGroup(groupId);
    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error });
    }

    const insertPromises = [];
    for (const [day, sessions] of Object.entries(result.timetable)) {
      for (const session of sessions) {
        insertPromises.push(db.query(`
          INSERT INTO timetable (group_id, subject_id, teacher_id, classroom_id, day, timeslot, duration, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        `, [
          groupId,
          session.subject_id,
          session.teacher_id,
          session.classroom_id,
          day,
          session.timeslot,
          session.duration
        ]));
      }
    }

    await Promise.all(insertPromises);

    res.status(200).json({
      success: true,
      message: 'Timetable generated and saved to the database',
      unassigned: result.unassigned,
      warnings: result.warnings
    });
  } catch (error) {
    console.error('🛑 Error during timetable generation:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getTimetable = async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    const { rows } = await db.query(`
      SELECT t.*, 
             s.name AS subject_name,
             e.first_name AS teacher_first_name, 
             e.last_name AS teacher_last_name,
             c.name AS classroom_name,
             c.type AS classroom_type,
             TO_CHAR(LOWER(t.timeslot)::time, 'HH24:MI') || '-' || 
             TO_CHAR(UPPER(t.timeslot)::time, 'HH24:MI') AS formatted_timeslot
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
        LOWER(t.timeslot)
    `, [groupId]);

    const formatted = rows.reduce((acc, row) => {
      if (!acc[row.day]) acc[row.day] = [];
      acc[row.day].push({
        subject: row.subject_name,
        teacher: `${row.teacher_first_name} ${row.teacher_last_name}`,
        classroom: row.classroom_name,
        classroom_type: row.classroom_type,
        timeslot: row.formatted_timeslot,
        duration: row.duration
      });
      return acc;
    }, {});

    res.status(200).json({ success: true, timetable: formatted });
  } catch (error) {
    console.error('🛑 Error fetching timetable:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const generateAllGroupsDryRun = async (req, res) => {
  try {
    const result = await timetableGenerator.generateAllTimetables();
    if (result.success) {
      res.status(200).json({
        message: 'Dry-run for all groups completed',
        successCount: result.successCount,
        failureCount: result.failureCount,
        globalConflicts: result.globalConflicts,
        results: result.results,
        summary: result.summary
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in dry-run all:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentTimetable = async (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  try {
    const result = await timetableGenerator.getStudentTimetable(studentId);
    if (result.success) {
      res.status(200).json({
        success: true,
        studentId: result.studentId,
        groupId: result.groupId,
        timetable: result.timetable
      });
    } else {
      res.status(404).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error getting student timetable:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


const getTeacherTimetable = async (req, res) => {
  const teacherId = parseInt(req.params.teacherId, 10);
  if (isNaN(teacherId)) {
    return res.status(400).json({ error: 'Invalid teacher ID' });
  }

  try {
    const result = await timetableGenerator.getTeacherTimetable(teacherId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error fetching teacher timetable:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  dryRun,
  generateAndSave,
  getTimetable,
  generateAllGroupsDryRun,
  getStudentTimetable,
  getTeacherTimetable
};