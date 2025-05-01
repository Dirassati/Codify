const pool = require("../db/db");

exports.createEquipment = async ({ name, description, quantity = 1 }) => {
  if (!name) throw new Error("Equipment name is required");
  if (quantity <= 0) throw new Error("Quantity must be positive");

  const checkQuery = "SELECT * FROM equipments WHERE LOWER(name) = LOWER($1)";
  const { rows: [existingEquipment] } = await pool.query(checkQuery, [name]);

  if (existingEquipment) {
    const updateQuery = `
      UPDATE equipments 
      SET quantity = quantity + $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const { rows: [updated] } = await pool.query(updateQuery, [quantity, existingEquipment.id]);
    return updated;
  }

  const insertQuery = `
    INSERT INTO equipments (name, description, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: [newEquipment] } = await pool.query(insertQuery, [name, description, quantity]);
  return newEquipment;
};
exports.getAllEquipments = async () => {
  const query = `
    SELECT 
      id,
      name as equipment,
      description,
      quantity,
      (quantity - COALESCE(used, 0)) as available
    FROM equipments
    ORDER BY name ASC
  `;
  const { rows } = await pool.query(query);
  return rows;
};