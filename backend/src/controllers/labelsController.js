const pool = require('../config/database');

class LabelsController {
  static async getLabels(req, res) {
    try {
      const result = await pool.query('SELECT * FROM labels WHERE user_id = $1 ORDER BY name', [req.user.id]);
      res.json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch labels' });
    }
  }

  static async createLabel(req, res) {
    try {
      const { name, color } = req.body;
      const result = await pool.query('INSERT INTO labels (user_id, name, color) VALUES ($1, $2, $3) RETURNING *', [req.user.id, name, color || '#808080']);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ success: false, error: 'Label already exists' });
      }
      res.status(500).json({ success: false, error: 'Failed to create label' });
    }
  }

  static async deleteLabel(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM labels WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Label not found' });
      }
      res.json({ success: true, message: 'Label deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete label' });
    }
  }
}

module.exports = LabelsController;
