const pool = require("../db/db");

exports.listParentsWithChildrenCount = async () => {
  const query = `
    SELECT 
      p.id,
      p.last_name,
      p.first_name,
      p.phone_number,
      p.address,
      p.profession,
      p.etat_civil,
      p.card_id,
      u.email,
      COUNT(e.id) as children_count
    FROM parents p
    JOIN users u ON u.id = p.id
    LEFT JOIN eleve e ON e.parent_id = p.id
    WHERE u.user_role = 'parents'
    GROUP BY p.id, u.email
    ORDER BY p.last_name ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

exports.getParentWithChildren = async (parentId) => {
  const parentCheck = await pool.query(`SELECT id FROM parents WHERE id = $1`, [
    parentId,
  ]);

  if (parentCheck.rows.length === 0) {
    return {
      error: true,
      statusCode: 404,
      message: "Parent not found",
    };
  }

  const children = await pool.query(
    `SELECT 
      e.id,
      e.last_name,
      e.first_name,
      u.matricule,
      u.email,
      g.name as group_name,
      gr.name as grade_year,
      gr.level as grade_level,
      COALESCE(s.name, '-') as specialization_name
    FROM eleve e
    JOIN users u ON e.id = u.id
    LEFT JOIN groups g ON e.group_id = g.id
    LEFT JOIN grades gr ON e.grade_id = gr.id
    LEFT JOIN specializations s ON e.specialization_id = s.id
    WHERE e.parent_id = $1
    ORDER BY e.last_name ASC`,
    [parentId]
  );

  return {
    children: children.rows,
  };
};

exports.getParentByCardId = async (cardId) => {
  const query = `
  SELECT id FROM PARENTS WHERE card_id=$1
  `;
  const parentId = pool.query(query);
  return parentId;
};

exports.getParentById = async (parentId) => {
  if (!parentId) {
    throw new Error("Parent ID is required");
  }
  try {
    const { rows } = await pool.query(
      `
      SELECT p.*, u.email 
      FROM parents p
      JOIN users u ON p.id = u.id
      WHERE p.id = $1
    `,
      [parentId]
    );

    if (rows.length === 0 || !rows[0].email) {
      throw new Error("Parent not found or missing email");
    }
    if (!rows[0].email) {
      console.warn(`Parent ${parentId} has no email address`);
      // Still return the parent but without email
      return parent;
    }

    return rows[0];
  } catch (error) {
    console.error(`Error fetching parent ${parentId}:`, error);
    throw error;
  }
};
