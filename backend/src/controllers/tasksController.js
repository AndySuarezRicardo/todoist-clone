const pool = require('../config/database');
const { validationResult } = require('express-validator');

class TasksController {
  static async getTasks(req, res) {
    try {
      const { project_id, completed } = req.query;

      let query = 'SELECT t.*, p.name as project_name, array_agg(DISTINCT l.name) FILTER (WHERE l.name IS NOT NULL) as labels FROM tasks t LEFT JOIN projects p ON t.project_id = p.id LEFT JOIN task_labels tl ON t.id = tl.task_id LEFT JOIN labels l ON tl.label_id = l.id WHERE t.user_id = $1';
      const params = [req.user.id];
      let paramCount = 1;

      if (project_id) {
        paramCount++;
        query += \` AND t.project_id = $\${paramCount}\`;
        params.push(project_id);
      }

      if (completed !== undefined) {
        paramCount++;
        query += \` AND t.is_completed = $\${paramCount}\`;
        params.push(completed === 'true');
      }

      query += ' GROUP BY t.id, p.name ORDER BY t.position, t.created_at DESC';

      const result = await pool.query(query, params);

      res.json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
    }
  }

  static async createTask(req, res) {
    const client = await pool.connect();
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { title, description, project_id, parent_task_id, priority = 1, due_date, labels = [] } = req.body;

      await client.query('BEGIN');

      const taskResult = await client.query(
        'INSERT INTO tasks (user_id, project_id, parent_task_id, title, description, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [req.user.id, project_id, parent_task_id, title, description, priority, due_date]
      );

      const task = taskResult.rows[0];

      if (labels && labels.length > 0) {
        for (const labelId of labels) {
          await client.query('INSERT INTO task_labels (task_id, label_id) VALUES ($1, $2)', [task.id, labelId]);
        }
      }

      await client.query('COMMIT');
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Create task error:', error);
      res.status(500).json({ success: false, error: 'Failed to create task' });
    } finally {
      client.release();
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, priority, due_date, is_completed } = req.body;

      const updates = [];
      const values = [];
      let paramCount = 1;

      if (title !== undefined) {
        updates.push(\`title = $\${paramCount++}\`);
        values.push(title);
      }
      if (description !== undefined) {
        updates.push(\`description = $\${paramCount++}\`);
        values.push(description);
      }
      if (priority !== undefined) {
        updates.push(\`priority = $\${paramCount++}\`);
        values.push(priority);
      }
      if (due_date !== undefined) {
        updates.push(\`due_date = $\${paramCount++}\`);
        values.push(due_date);
      }
      if (is_completed !== undefined) {
        updates.push(\`is_completed = $\${paramCount++}\`);
        values.push(is_completed);
        if (is_completed) {
          updates.push('completed_at = CURRENT_TIMESTAMP');
        } else {
          updates.push('completed_at = NULL');
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: 'No fields to update' });
      }

      values.push(id, req.user.id);
      const query = \`UPDATE tasks SET \${updates.join(', ')} WHERE id = $\${paramCount} AND user_id = $\${paramCount + 1} RETURNING *\`;
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ success: false, error: 'Failed to update task' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ success: false, error: 'Failed to delete task' });
    }
  }
}

module.exports = TasksController;
