
exports.up = async function(knex) {
    // Drop existing triggers and functions if they exist
    await knex.raw('DROP TRIGGER IF EXISTS teacher_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS classroom_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS group_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS subject_per_day_trigger ON timetable');
  
    await knex.raw('DROP FUNCTION IF EXISTS check_teacher_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_classroom_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_group_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_subject_per_day');
  
    // Create corrected functions and triggers
  
    await knex.raw(`
      CREATE OR REPLACE FUNCTION check_teacher_availability()
      RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE teacher_id = NEW.teacher_id
            AND day = NEW.day
            AND (NEW.timeslot && timeslot)
            AND (id IS DISTINCT FROM NEW.id)
        ) THEN
          RAISE EXCEPTION 'Enseignant % est déjà occupé à ce créneau', NEW.teacher_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
  
    await knex.raw(`
      CREATE OR REPLACE FUNCTION check_classroom_availability()
      RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE classroom_id = NEW.classroom_id
            AND day = NEW.day
            AND (NEW.timeslot && timeslot)
            AND (id IS DISTINCT FROM NEW.id)
        ) THEN
          RAISE EXCEPTION 'Salle % est déjà occupée à ce créneau', NEW.classroom_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
  
    await knex.raw(`
      CREATE OR REPLACE FUNCTION check_group_availability()
      RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE group_id = NEW.group_id
            AND day = NEW.day
            AND (NEW.timeslot && timeslot)
            AND (id IS DISTINCT FROM NEW.id)
        ) THEN
          RAISE EXCEPTION 'Groupe % a déjà un cours à ce créneau', NEW.group_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
  
    await knex.raw(`
      CREATE OR REPLACE FUNCTION check_subject_per_day()
      RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE group_id = NEW.group_id
            AND subject_id = NEW.subject_id
            AND day = NEW.day
            AND (id IS DISTINCT FROM NEW.id)
        ) THEN
          RAISE EXCEPTION 'Cette matière est déjà programmée pour ce groupe aujourd''hui';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
  
    await knex.raw(`
      CREATE TRIGGER teacher_availability_trigger
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_teacher_availability();
    `);
  
    await knex.raw(`
      CREATE TRIGGER classroom_availability_trigger
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_classroom_availability();
    `);
  
    await knex.raw(`
      CREATE TRIGGER group_availability_trigger
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_group_availability();
    `);
  
    await knex.raw(`
      CREATE TRIGGER subject_per_day_trigger
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_subject_per_day();
    `);
  };
  
  exports.down = async function(knex) {
    // Drop triggers and functions created in this migration
    await knex.raw('DROP TRIGGER IF EXISTS teacher_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS classroom_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS group_availability_trigger ON timetable');
    await knex.raw('DROP TRIGGER IF EXISTS subject_per_day_trigger ON timetable');
  
    await knex.raw('DROP FUNCTION IF EXISTS check_teacher_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_classroom_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_group_availability');
    await knex.raw('DROP FUNCTION IF EXISTS check_subject_per_day');
  };
  