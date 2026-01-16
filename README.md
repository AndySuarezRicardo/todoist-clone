# 🚀 Todoist Clone - Full-Stack Task Management Application

A complete task management application inspired by Todoist, built with modern technologies and fully dockerized.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 📋 Features

✅ **Complete Authentication System**
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt

✅ **Task Management**
- Create, edit, and delete tasks
- Mark tasks as completed
- 4 priority levels with color coding
- Due dates and descriptions
- Sub-tasks support

✅ **Organization**
- Custom projects with colors
- Reusable labels/tags
- Filters by project, priority, and status

✅ **Modern UI**
- Responsive design with TailwindCSS
- Intuitive user experience
- Real-time updates

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** with UUID primary keys
- **JWT** authentication
- **bcrypt** for password hashing
- Security: Helmet, CORS, Rate Limiting

### Frontend
- **React 18** with Hooks
- **Vite** for fast builds
- **TailwindCSS** for styling
- **React Router v6**
- **Axios** for API requests

### DevOps
- **Docker** + **Docker Compose**
- Multi-stage builds
- Health checks
- Persistent volumes

## 🚀 Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed
- Git (optional)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/AndySuarezRicardo/todoist-clone.git
cd todoist-clone
\`\`\`

2. **Start the application**
\`\`\`bash
docker-compose up --build
\`\`\`

Wait for the services to start (first time takes 3-5 minutes)

3. **Run database migrations**

Open a new terminal and run:
\`\`\`bash
docker-compose exec backend npm run migrate
\`\`\`

You should see: ✅ Database migrations completed successfully

4. **Open the application**

Navigate to: **http://localhost:3000**

## 📖 Usage

### First Time Setup

1. Click "Register" and create an account
2. Fill in your details and submit
3. You'll be automatically logged in

### Creating Tasks

1. Click "+ Add Task" button
2. Enter task details:
   - Title (required)
   - Description (optional)
   - Project
   - Priority (Low, Medium, High, Urgent)
   - Due date

3. Click "Add Task"

### Managing Tasks

- **Complete**: Click the circle icon
- **Edit**: Hover and click the edit icon
- **Delete**: Hover and click the trash icon

## 🛠️ Development

### Project Structure

\`\`\`
todoist-clone/
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── config/          # Database & configuration
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth & validation
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Utilities
│   │   └── server.js        # Express server
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Global state
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml        # Orchestration
└── README.md
\`\`\`

### API Endpoints

#### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/me` - Get current user

#### Tasks
- GET `/api/v1/tasks` - List tasks
- POST `/api/v1/tasks` - Create task
- PUT `/api/v1/tasks/:id` - Update task
- DELETE `/api/v1/tasks/:id` - Delete task

#### Projects
- GET `/api/v1/projects` - List projects
- POST `/api/v1/projects` - Create project
- DELETE `/api/v1/projects/:id` - Delete project

#### Labels
- GET `/api/v1/labels` - List labels
- POST `/api/v1/labels` - Create label
- DELETE `/api/v1/labels/:id` - Delete label

### Environment Variables

Backend (`.env`):
\`\`\`env
NODE_ENV=production
PORT=5000
DB_HOST=postgres
DB_NAME=todoist_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
\`\`\`

## 🐳 Docker Commands

\`\`\`bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything (⚠️ deletes data)
docker-compose down -v

# Rebuild after changes
docker-compose up --build
\`\`\`

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT authentication with expiration
- ✅ Rate limiting (100 requests/15 min)
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ SQL injection protection (prepared statements)
- ✅ Input validation
- ✅ Environment variables for secrets

## 📊 Database Schema

The application uses PostgreSQL with 9 tables:

- **users** - User accounts
- **projects** - Task organization
- **tasks** - Main tasks with priorities
- **labels** - Reusable tags
- **task_labels** - Many-to-many relationship
- **comments** - Task comments
- **filters** - Custom views

## 🚧 Troubleshooting

### Port already in use
\`\`\`bash
# Find process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in docker-compose.yml
\`\`\`

### Database connection failed
\`\`\`bash
# Restart with fresh database
docker-compose down -v
docker-compose up --build
docker-compose exec backend npm run migrate
\`\`\`

### Frontend not loading
- Wait 1-2 minutes for build to complete
- Check logs: `docker-compose logs frontend`
- Try hard refresh: Ctrl+F5

## 📈 Future Enhancements

- [ ] Drag & drop for reordering
- [ ] Kanban board view
- [ ] Dark mode
- [ ] Email notifications
- [ ] File attachments
- [ ] Collaboration features
- [ ] Mobile app (React Native)
- [ ] Calendar integration

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 👤 Author

**Andy Suarez Ricardo**
- GitHub: [@AndySuarezRicardo](https://github.com/AndySuarezRicardo)

## 🙏 Acknowledgments

- Inspired by [Todoist](https://todoist.com)
- Built as a full-stack learning project

---

⭐ If you found this helpful, please give it a star on GitHub!
