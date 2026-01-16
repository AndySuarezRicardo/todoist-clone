require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const projectsRoutes = require('./routes/projects');
const labelsRoutes = require('./routes/labels');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests, please try again later'
});
app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const API_VERSION = process.env.API_VERSION || 'v1';
app.use(\`/api/\${API_VERSION}/auth\`, authRoutes);
app.use(\`/api/\${API_VERSION}/tasks\`, tasksRoutes);
app.use(\`/api/\${API_VERSION}/projects\`, projectsRoutes);
app.use(\`/api/\${API_VERSION}/labels\`, labelsRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📝 Environment: \${process.env.NODE_ENV || 'development'}\`);
  console.log(\`🔗 API: http://localhost:\${PORT}/api/\${API_VERSION}\`);
});

module.exports = app;
