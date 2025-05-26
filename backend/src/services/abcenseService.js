const knex = require("../db/knex");
const { sendEmail } = require("../utils/mailer");
const studentService = require("./studentService");
const parentService = require("./parentService");
const teacherService = require("./teacherService");
const subjectService = require("./subjectService");
const notificationService = require("./notificationService");
const pool = require("../db/db");

class AbsenceService {
  /**
   * Report a student absence
   * @param {number} studentId - ID of absent student
   * @param {number} groupId - ID of student's group
   * @param {number} teacherId - ID of reporting teacher
   * @param {number} subjectId - ID of subject for the absence
   * @param {Date} date - Date of absence
   * @returns {Promise<Object>} Created absence record
   */
  static async reportAbsence(
    studentId,
    groupId,
    teacherId,
    subjectId,
    date,
    timing
  ) {
    return knex.transaction(async (trx) => {
      // Check for existing absence
      const existing = await trx("absences")
        .where({ student_id: studentId, date })
        .first();

      if (existing) {
        throw new Error(
          "Absence already reported for this student on this date"
        );
      }

      // Create absence record
      const [absence] = await trx("absences")
        .insert({
          student_id: studentId,
          group_id: groupId,
          teacher_id: teacherId,
          subject_id: subjectId,
          date,
          timing,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        })
        .returning("*");

      // Get related entities
      const student = await studentService.getStudentDetails(studentId);
      // In reportAbsence():
      const parent = await studentService.getParentByStudentId(studentId);
      //console.log("Parent data received:", JSON.stringify(parent, null, 2));
      // Add this validation immediately after:
      if (!parent?.id) {
        // console.error("Invalid parent data:", parent);
        throw new Error(`Student ${studentId} has no valid parent record`);
      }
      const teacher = await teacherService.getTeacherWithSubjects(teacherId);
      const subject = await subjectService.getSubjectById(subjectId);
      const group = await trx("groups").where({ id: groupId }).first();

      // Send notifications
      await this._sendAbsenceNotifications(
        parent,
        student,
        absence,
        teacher,
        subject,
        group
      );

      return absence;
    });
  }

  /**
   * Justify an absence
   * @param {number} absenceId - ID of absence record
   * @param {number} parentId - ID of justifying parent
   * @param {string} justificationText - Reason for absence
   * @param {string} [filePath] - Path to uploaded justification file
   * @returns {Promise<Object>} Updated absence record
   */
  static async justifyAbsence(
    absenceId,
    parentId,
    justificationText,
    filePath = null
  ) {
    return knex.transaction(async (trx) => {
      const [absence] = await trx("absences")
        .where({ id: absenceId })
        .update({
          justified: true,
          justification_text: justificationText,
          justification_file_path: filePath,
          parent_id: parentId,
          updated_at: knex.fn.now(),
        })
        .returning("*");

      if (!absence) {
        throw new Error("Absence not found");
      }

      // Get related entities
      const student = await studentService.getStudentDetails(
        absence.student_id
      );
      const parent = await parentService.getParentById(parentId);
      const subject = await subjectService.getSubjectById(absence.subject_id);

      // Send notifications to admins
      await this._sendJustificationNotifications(
        parent,
        student,
        absence,
        subject
      );

      return absence;
    });
  }

  /**
   * Validate or reject a justification
   * @param {number} absenceId - ID of absence record
   * @param {number} adminId - ID of admin validating
   * @param {boolean} validated - Whether justification is accepted
   * @param {string} [message] - Optional message to parent
   * @returns {Promise<Object>} Updated absence record
   */
  static async validateJustification(
    absenceId,
    adminId,
    validated,
    message = null
  ) {
    return knex.transaction(async (trx) => {
      const [absence] = await trx("absences")
        .where({ id: absenceId })
        .update({
          validated,
          validated_by: adminId,
          validated_at: validated ? knex.fn.now() : null,
          admin_message: message,
          updated_at: knex.fn.now(),
        })
        .returning("*");

      if (!absence) {
        throw new Error("Absence not found");
      }

      // Get related entities
      const student = await studentService.getStudentDetails(
        absence.student_id
      );
      const parent = await parentService.getParentById(absence.parent_id);
      const subject = await subjectService.getSubjectById(absence.subject_id);

      // Send notification to parent
      await this._sendValidationNotification(
        parent,
        student,
        absence,
        subject,
        validated,
        message
      );

      return absence;
    });
  }

  /**
   * Get absences for a student
   * @param {number} studentId - ID of student
   * @param {Object} [filters] - Optional filters
   * @returns {Promise<Array>} List of absences
   */
  static async getStudentAbsences(studentId, filters = {}) {
    let query = knex("absences")
      .where({ student_id: studentId })
      .orderBy("date", "desc");

    this._applyFilters(query, filters);
    return query;
  }

  /**
   * Get absences for a group
   * @param {number} groupId - ID of group
   * @param {Object} [filters] - Optional filters
   * @returns {Promise<Array>} List of absences
   */
  static async getGroupAbsences(groupId, filters = {}) {
    let query = knex("absences")
      .where({ group_id: groupId })
      .orderBy("date", "desc");

    this._applyFilters(query, filters);
    return query;
  }

  /**
   * Get all absences with filters
   * @param {Object} [filters] - Filters for query
   * @returns {Promise<Array>} Filtered list of absences
   */
  static async getAllAbsences(filters = {}) {
    let query = knex("absences").select("absences.*").orderBy("date", "desc");

    this._applyFilters(query, filters);
    return query;
  }

  /**
   * Get absence by ID with full details
   * @param {number} absenceId - ID of absence
   * @returns {Promise<Object>} Absence record with relations
   */
  static async getAbsenceDetails(absenceId) {
    return knex("absences")
      .where("absences.id", absenceId)
      .leftJoin("eleve", "absences.student_id", "eleve.id")
      .leftJoin("parents", "absences.parent_id", "parents.id")
      .leftJoin("enseignant", "absences.teacher_id", "enseignant.id")
      .leftJoin("subjects", "absences.subject_id", "subjects.id")
      .leftJoin("groups", "absences.group_id", "groups.id")
      .select(
        "absences.*",
        "eleve.first_name as student_first_name",
        "eleve.last_name as student_last_name",
        "parents.first_name as parent_first_name",
        "parents.last_name as parent_last_name",
        "enseignant.first_name as teacher_first_name",
        "enseignant.last_name as teacher_last_name",
        "subjects.name as subject_name",
        "groups.name as group_name"
      )
      .first();
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Apply common filters to queries
   * @private
   */
  static _applyFilters(query, filters) {
    if (filters.justified !== undefined) {
      query.where("justified", filters.justified);
    }
    if (filters.validated !== undefined) {
      query.where("validated", filters.validated);
    }
    if (filters.startDate) {
      query.where("date", ">=", filters.startDate);
    }
    if (filters.endDate) {
      query.where("date", "<=", filters.endDate);
    }
    return query;
  }

  /**
   * Send all notifications for a new absence
   * @private
   */
  static async _sendAbsenceNotifications(
    parent,
    student,
    absence,
    teacher,
    subject,
    group
  ) {
    if (!parent) {
      console.warn(
        `Cannot send notifications - parent data missing for student ${student.id}`
      );
      return;
    }
    const {
      rows: [user],
    } = await pool.query(`SELECT email FROM users WHERE id = $1`, [parent.id]);
    const parent_email = user?.email;

    if (!parent_email) {
      console.warn(`No email for parent ${parent.id}`);
    }
    // Validate all required parameters
    if (!student) {
      console.error("Missing required parameters for notifications(student)", {
        parentExists: !!parent,
        studentExists: !!student,
      });
      return;
    }
    if (!absence) {
      console.warn(
        `Cannot send notifications - absence data missing for student ${student.id}`
      );
      return;
    }
    // Email to parent
    const emailSubject = `Absence de votre enfant ${student.first_name} ${student.last_name}`;
    const emailText = `Your child ${student.name} was absent at ${absence.date} ${absence.timing} 
          and the absence is marked by the Mr/Ms ${teacher.name} .
          You can justify the absence at Dirassati.com parents' space `; // Your email template
    const emailHtml = `<p>Your child <b>${student.name} </b>was absent at <b>${absence.date} ${absence.timing} </b>
          and the absence is marked by the Mr/Ms <b>${teacher.name} </b>.
          You can justify the absence at Dirassati.com parents' space</p>`; // Your HTML email template

    // 2. Attempt email silently
    if (parent_email) {
      try {
        await sendEmail({
          to: `${parent_email}`,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error(`Email failed for ${parent_email}:`, emailError.message);
      }
    }
    // console.log(parent);
    // console.log("userid:", parent.id);
    // Dashboard notification for parent
    if (!parent?.id) {
      console.error("Cannot create notification - invalid parent ID");
      return;
    }
    await notificationService.createNotification({
      user_id: parent.id,
      type: "absence_reported",
      title: "Nouvelle absence",
      message: `${student.first_name} était absent en ${subject.name} (${group.name})`,
      action_url: `/parent/absences/${absence.id}`,
      related_entity: "absence",
      related_entity_id: absence.id,
    });

    // Dashboard notifications for admins
    const admins = await knex("users").where({ user_role: "admin" });
    await Promise.all(
      admins.map((admin) =>
        notificationService.createNotification({
          user_id: admin.id,
          type: "absence_reported_admin",
          title: "Nouvelle absence signalée",
          message: `${student.first_name} ${student.last_name} absent en ${subject.name}`,
          action_url: `/admin/absences/${absence.id}`,
          related_entity: "absence",
          related_entity_id: absence.id,
        })
      )
    );
  }

  /**
   * Send notifications when absence is justified
   * @private
   */
  static async _sendJustificationNotifications(
    parent,
    student,
    absence,
    subject
  ) {
    // Dashboard notifications for admins
    const admins = await knex("users").where({ user_role: "admin" });
    await Promise.all(
      admins.map((admin) =>
        notificationService.createNotification({
          user_id: admin.id,
          type: "absence_justified",
          title: "Absence justifiée",
          message: `${parent.first_name} a justifié l'absence de ${student.first_name} en ${subject.name}`,
          action_url: `/admin/absences/${absence.id}/review`,
          related_entity: "absence",
          related_entity_id: absence.id,
        })
      )
    );
  }

  /**
   * Send validation notification to parent
   * @private
   */
  static async _sendValidationNotification(
    parent,
    student,
    absence,
    subject,
    validated,
    message
  ) {
    // Email to parent
    const emailSubject = validated
      ? `Justification validated for ${student.first_name}`
      : `Justification rejected for ${student.first_name}`;

    const emailText = validated
      ? `Your justification is accepted .Thank you`
      : `${message}`;

    await sendEmail(parent.email, emailSubject, emailText);

    // Dashboard notification for parent
    await notificationService.createNotification({
      user_id: parent.id,
      type: validated ? "justification_validated" : "justification_rejected",
      title: validated ? "Justification accepted" : "Justification rejeted",
      message: validated
        ? `Your justification for ${student.first_name} at ${subject.name} is accepted`
        : `${message}`,
      action_url: `/parent/absences/${absence.id}`,
      related_entity: "absence",
      related_entity_id: absence.id,
    });
  }
}

module.exports = AbsenceService;
