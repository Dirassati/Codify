// migrations/20250517_add_timetable_conflict_triggers.js

exports.up = async function(knex) {
    await knex.raw(`
      CREATE INDEX IF NOT EXISTS idx_timetable_teacher_day_timeslot ON timetable (teacher_id, day, timeslot);
      CREATE INDEX IF NOT EXISTS idx_timetable_classroom_day_timeslot ON timetable (classroom_id, day, timeslot);
      CREATE INDEX IF NOT EXISTS idx_timetable_group_day_timeslot ON timetable (group_id, day, timeslot);
  
      CREATE OR REPLACE FUNCTION check_teacher_availability_func() RETURNS trigger AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE day = NEW.day
            AND teacher_id = NEW.teacher_id
            AND timeslot && NEW.timeslot
            AND id <> COALESCE(NEW.id, -1)
        ) THEN
          RAISE EXCEPTION 'Teacher % already booked during this timeslot on %', NEW.teacher_id, NEW.day;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  
      CREATE OR REPLACE FUNCTION check_classroom_availability_func() RETURNS trigger AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE day = NEW.day
            AND classroom_id = NEW.classroom_id
            AND timeslot && NEW.timeslot
            AND id <> COALESCE(NEW.id, -1)
        ) THEN
          RAISE EXCEPTION 'Classroom % already booked during this timeslot on %', NEW.classroom_id, NEW.day;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  
      CREATE OR REPLACE FUNCTION check_group_availability_func() RETURNS trigger AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM timetable
          WHERE day = NEW.day
            AND group_id = NEW.group_id
            AND timeslot && NEW.timeslot
            AND id <> COALESCE(NEW.id, -1)
        ) THEN
          RAISE EXCEPTION 'Group % already booked during this timeslot on %', NEW.group_id, NEW.day;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  
      DROP TRIGGER IF EXISTS check_teacher_availability ON timetable;
      DROP TRIGGER IF EXISTS check_classroom_availability ON timetable;
      DROP TRIGGER IF EXISTS check_group_availability ON timetable;
  
      CREATE TRIGGER check_teacher_availability
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_teacher_availability_func();
  
      CREATE TRIGGER check_classroom_availability
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_classroom_availability_func();
  
      CREATE TRIGGER check_group_availability
      BEFORE INSERT OR UPDATE ON timetable
      FOR EACH ROW EXECUTE FUNCTION check_group_availability_func();
    `);
  };
  
  exports.down = async function(knex) {
    await knex.raw(`
      DROP INDEX IF EXISTS idx_timetable_teacher_day_timeslot;
      DROP INDEX IF EXISTS idx_timetable_classroom_day_timeslot;
      DROP INDEX IF EXISTS idx_timetable_group_day_timeslot;
  
      DROP TRIGGER IF EXISTS check_teacher_availability ON timetable;
      DROP TRIGGER IF EXISTS check_classroom_availability ON timetable;
      DROP TRIGGER IF EXISTS check_group_availability ON timetable;
  
      DROP FUNCTION IF EXISTS check_teacher_availability_func();
      DROP FUNCTION IF EXISTS check_classroom_availability_func();
      DROP FUNCTION IF EXISTS check_group_availability_func();
    `);
  };
  