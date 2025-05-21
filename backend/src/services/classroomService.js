const pool = require("../db/db");

exports.createClassroomWithEquipments = async (classroomData) => {
  const { name, type, available = true, capacity, building, floor, room_number, description, equipments } = classroomData;

  const checkQuery = "SELECT * FROM classrooms WHERE name = $1";
  const { rows: existingClassrooms } = await pool.query(checkQuery, [name]);

  if (existingClassrooms.length > 0) {
    throw new Error("Classroom already exists");
  }

  const insertQuery = `
    INSERT INTO classrooms (name, type, available, capacity, building, floor, room_number, description, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    RETURNING *;
  `;
  const values = [name, type, available, capacity, building, floor, room_number, description];
  const { rows: classroomRows } = await pool.query(insertQuery, values);

  const classroom = classroomRows[0];

  if (equipments && Array.isArray(equipments)) {
    for (const equip of equipments) {
      await exports.addEquipmentToClassroom(classroom.id, equip.equipmentId, equip.quantity);
    }
  }

  return classroom;
};

exports.addEquipmentToClassroom = async (classroomId, equipmentId, quantity) => {
  const classroomCheck = await pool.query(`SELECT id FROM classrooms WHERE id = $1`, [classroomId]);
  if (classroomCheck.rows.length === 0) {
    throw new Error("Classroom not found");
  }

  const equipmentQuery = `SELECT quantity, used FROM equipments WHERE id = $1`;
  const { rows: equipmentRows } = await pool.query(equipmentQuery, [equipmentId]);
  const equipment = equipmentRows[0];

  if (!equipment) {
    throw new Error("Equipment not found");
  }

  if (equipment.quantity - equipment.used < quantity) {
    throw new Error("Not enough available equipments");
  }

  const checkAssignmentQuery = `
    SELECT * FROM classroom_equipments
    WHERE classroom_id = $1 AND equipment_id = $2
  `;
  const { rows: existingAssignment } = await pool.query(checkAssignmentQuery, [classroomId, equipmentId]);

  if (existingAssignment.length > 0) {
    throw new Error("This equipment is already assigned to the classroom");
  }

  const insertQuery = `
    INSERT INTO classroom_equipments (classroom_id, equipment_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(insertQuery, [classroomId, equipmentId, quantity]);

  const newUsed = equipment.used + quantity;
  await pool.query(`UPDATE equipments SET used = $1 WHERE id = $2`, [newUsed, equipmentId]);

  return rows[0];
};

exports.getAllClassrooms = async () => {
  const query = `
    SELECT 
      c.id,
      c.name as classroom,
      c.type,
      c.capacity,
      c.building,
      c.floor,
      c.description,
      COUNT(ce.equipment_id) as equipment_count
    FROM classrooms c
    LEFT JOIN classroom_equipments ce ON c.id = ce.classroom_id
    GROUP BY c.id
    ORDER BY c.name ASC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

exports.getClassroomEquipments = async (classroomId) => {
  const classroomExists = await pool.query('SELECT id FROM classrooms WHERE id = $1', [classroomId]);
  if (classroomExists.rows.length === 0) {
    throw new Error('Classroom not found');
  }

  const query = `
    SELECT 
      e.id,
      e.name as equipment,
      e.description,
      ce.quantity
    FROM classroom_equipments ce
    JOIN equipments e ON ce.equipment_id = e.id
    WHERE ce.classroom_id = $1
    ORDER BY e.name ASC
  `;
  const { rows } = await pool.query(query, [classroomId]);
  return rows;
};