import pool from "../config/db.js";

const insertRealtimeData = async (req, res) => {
  const { source_id, event_type, payload } = req.body;

  try {
    const query = `
      INSERT INTO realtime_data (source_id, event_type, payload)
      VALUES (?, ?, ?)
    `;

    await pool.execute(query, [
      source_id,
      event_type,
      JSON.stringify(payload)
    ]);

    return res.status(201).json({
      message: "Data inserted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Database error",
      details: err.message
    });
  }
};

const getLatestData = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, source_id, payload, received_at
      FROM realtime_data
      ORDER BY received_at DESC
      LIMIT 5000
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};


export default {
  insertRealtimeData,
  getLatestData
};
