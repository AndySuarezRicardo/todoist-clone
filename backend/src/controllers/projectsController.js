const pool = require('../config/database');

class ProjectsController {
  static async getProjects(req, res) {
    try {
      const result = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY sort_order, created_at', [req.user.id]);
      res.json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
  }

  static async createProject(req, res) {
    try {
      const { name, color, icon } = req.body;
      const result = await pool.query('INSERT INTO projects (user_id, name, color, icon) VALUES ($1, $2, $3, $4) RETURNING *', [req.user.id, name, color || '#808080', icon]);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create project' });
    }
  }

  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete project' });
    }
  }
}

module.exports = ProjectsController;
