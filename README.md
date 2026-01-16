# 🚀 Todoist Clone - Full-Stack Task Management Application

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

A complete, production-ready task management application inspired by Todoist. Built with React, Node.js, Express, and PostgreSQL - fully dockerized and ready to deploy.

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
- **Node.js 18** + **Express.js**
- **PostgreSQL 15** with UUID primary keys
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

---

## 🚀 QUICK START (5 MINUTES)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Git installed (optional)

### Option 1: Automated Setup (Recommended)

#### Windows:
```bash
git clone https://github.com/AndySuarezRicardo/todoist-clone.git
cd todoist-clone
setup.bat
```

#### Mac/Linux:
```bash
git clone https://github.com/AndySuarezRicardo/todoist-clone.git
cd todoist-clone
chmod +x setup.sh
./setup.sh
```

The script will:
1. ✅ Stop any existing containers
2. ✅ Create environment files
3. ✅ Build and start all services
4. ✅ Run database migrations
5. ✅ Display access URLs

**Then open:** http://localhost:3000

---

### Option 2: Manual Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/AndySuarezRicardo/todoist-clone.git
cd todoist-clone
```

#### Step 2: Create Environment Files

**Backend:**
```bash
cp backend/.env.example backend/.env
```

**Frontend:**
```bash
echo "VITE_API_URL=http://localhost:5000/api/v1" > frontend/.env
```

#### Step 3: Start Docker Services
```bash
docker-compose up --build -d
```

⏰ **First time takes 5-10 minutes** (downloads images, installs dependencies)

#### Step 4: Check Services Are Running

```bash
docker-compose ps
```

You should see 3 containers running:
- `todoist-db` (PostgreSQL)
- `todoist-backend` (Node.js API)
- `todoist-frontend` (React + Nginx)

#### Step 5: Run Database Migrations

**IMPORTANT:** Wait 15-20 seconds for database to initialize, then:

```bash
docker-compose exec backend npm run migrate
```

Expected output:
```
🔄 Running database migrations...
✅ Database migrations completed successfully
```

#### Step 6: Verify Everything Works

**Test Backend:**
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-01-16...","version":"v1"}
```

**Test Frontend:**
Open browser: http://localhost:3000

---

## 📖 USAGE GUIDE

### First Time User

1. **Register Account**
   - Click "Register" on login page
   - Fill in: Full Name, Username, Email, Password (min 6 chars)
   - Click "Register"
   - You'll be automatically logged in

2. **Dashboard Overview**
   - Left sidebar: Projects and navigation
   - Main area: Task list
   - "+ Add Task" button: Create new tasks

3. **Create Your First Task**
   - Click "+ Add Task"
   - Enter task title (required)
   - Optional: Description, Priority, Due Date
   - Select project (default: Inbox)
   - Click "Add Task"

4. **Manage Tasks**
   - ⭕ **Complete:** Click circle icon
   - ✏️ **Edit:** Hover and click pencil icon
   - 🗑️ **Delete:** Hover and click trash icon

### Priority Levels
- 🔴 **Priority 4** (Urgent) - Red
- 🟡 **Priority 3** (High) - Yellow
- 🔵 **Priority 2** (Medium) - Blue
- ⚪ **Priority 1** (Low) - Gray

---

## 🛠️ DEVELOPMENT

### Project Structure

```
todoist-clone/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── config/            # Database & configuration
│   │   │   ├── database.js    # PostgreSQL connection
│   │   │   └── schema.sql     # Database schema
│   │   ├── controllers/       # Business logic
│   │   │   ├── authController.js
│   │   │   ├── tasksController.js
│   │   │   ├── projectsController.js
│   │   │   └── labelsController.js
│   │   ├── middleware/        # Auth & validation
│   │   │   └── auth.js
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.js
│   │   │   ├── tasks.js
│   │   │   ├── projects.js
│   │   │   └── labels.js
│   │   ├── utils/             # Utilities
│   │   │   └── migrate.js
│   │   └── server.js          # Express server
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── context/           # Global state
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API client
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docker-compose.yml          # Services orchestration
├── setup.bat                   # Windows setup script
├── setup.sh                    # Unix/Mac setup script
└── README.md
```

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires auth)

#### Tasks
- `GET /api/v1/tasks` - List tasks (requires auth)
  - Query params: `project_id`, `completed`, `priority`
- `POST /api/v1/tasks` - Create task (requires auth)
- `PUT /api/v1/tasks/:id` - Update task (requires auth)
- `DELETE /api/v1/tasks/:id` - Delete task (requires auth)

#### Projects
- `GET /api/v1/projects` - List projects (requires auth)
- `POST /api/v1/projects` - Create project (requires auth)
- `DELETE /api/v1/projects/:id` - Delete project (requires auth)

#### Labels
- `GET /api/v1/labels` - List labels (requires auth)
- `POST /api/v1/labels` - Create label (requires auth)
- `DELETE /api/v1/labels/:id` - Delete label (requires auth)

### Environment Variables

**Backend (`.env`):**
```env
NODE_ENV=production
PORT=5000
API_VERSION=v1
DB_HOST=postgres
DB_PORT=5432
DB_NAME=todoist_db
DB_USER=postgres
DB_PASSWORD=postgres123
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🐳 DOCKER COMMANDS

### Basic Commands

```bash
# Start services (detached mode)
docker-compose up -d

# Start with rebuild
docker-compose up --build -d

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend
docker-compose logs -f frontend

# Check running containers
docker-compose ps

# Stop services
docker-compose down

# Stop and remove volumes (⚠️ DELETES DATABASE)
docker-compose down -v

# Restart a service
docker-compose restart backend
```

### Troubleshooting Commands

```bash
# Access backend container shell
docker-compose exec backend sh

# Access database
docker-compose exec postgres psql -U postgres -d todoist_db

# Run migrations manually
docker-compose exec backend npm run migrate

# Check backend logs for errors
docker-compose logs backend --tail=50

# Rebuild only backend
docker-compose up --build -d backend
```

---

## 🔧 TROUBLESHOOTING

### ❌ Error: "Port 5000 is already in use"

**Solution 1: Kill process using port**

Windows:
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Mac/Linux:
```bash
lsof -ti:5000 | xargs kill -9
```

**Solution 2: Change port in docker-compose.yml**
```yaml
backend:
  ports:
    - "5001:5000"  # Change 5000 to 5001
```

### ❌ Error: "Cannot connect to Docker daemon"

**Solution:**
1. Make sure Docker Desktop is running
2. Look for Docker icon in system tray/menu bar
3. If not running, start Docker Desktop
4. Wait 30 seconds for Docker to initialize
5. Try command again

### ❌ Error: "Connection refused" or "ECONNREFUSED"

**Solution:**
```bash
# Check if all services are running
docker-compose ps

# If any service is not "Up", restart
docker-compose down
docker-compose up -d

# Wait 30 seconds
# Run migrations again
docker-compose exec backend npm run migrate
```

### ❌ Error: "Migration failed" or Database errors

**Solution (Nuclear option - resets everything):**
```bash
# Stop and remove everything
docker-compose down -v

# Start fresh
docker-compose up --build -d

# Wait 20 seconds
sleep 20

# Run migrations
docker-compose exec backend npm run migrate
```

### ❌ Frontend shows "Cannot read properties of undefined"

**Solution:**
```bash
# Check frontend environment
docker-compose exec frontend env | grep VITE

# If VITE_API_URL is missing, recreate .env
echo "VITE_API_URL=http://localhost:5000/api/v1" > frontend/.env

# Rebuild frontend
docker-compose up --build -d frontend
```

### ❌ "Invalid token" or Authentication issues

**Solution:**
1. Clear browser localStorage
   - Open DevTools (F12)
   - Go to Application > Local Storage
   - Delete all items
2. Refresh page
3. Login again

### 🐛 General Debug Process

1. **Check all containers are running:**
   ```bash
   docker-compose ps
   ```

2. **View real-time logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Test backend health:**
   ```bash
   curl http://localhost:5000/health
   ```

4. **Restart everything:**
   ```bash
   docker-compose restart
   ```

5. **Last resort (fresh start):**
   ```bash
   docker-compose down -v
   docker-compose up --build -d
   sleep 20
   docker-compose exec backend npm run migrate
   ```

---

## 🔒 SECURITY

### Implemented Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT authentication with expiration
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ SQL injection protection (prepared statements)
- ✅ Input validation with express-validator
- ✅ Environment variables for secrets

### For Production Deployment

1. **Change JWT Secret:**
   ```bash
   # Generate strong random secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Use HTTPS:**
   - Get SSL certificate (Let's Encrypt)
   - Configure reverse proxy (Nginx/Caddy)

3. **Update CORS:**
   ```env
   CORS_ORIGIN=https://yourdomain.com
   ```

4. **Secure Database:**
   - Use strong password
   - Don't expose port 5432 publicly

5. **Environment Variables:**
   - Use secrets manager (AWS Secrets Manager, etc.)
   - Never commit `.env` to Git

---

## 📊 DATABASE SCHEMA

### Tables

- **users** - User accounts and profiles
- **projects** - Task organization
- **tasks** - Main tasks with priorities and due dates
- **labels** - Reusable tags
- **task_labels** - Many-to-many relationship
- **comments** - Task comments (ready for future use)
- **filters** - Custom views (ready for future use)

### Key Features

- UUID primary keys
- Foreign key constraints with CASCADE
- Automatic timestamps (created_at, updated_at)
- Triggers for automatic timestamp updates
- Indexes on frequently queried columns

---

## 🚀 DEPLOYMENT

### Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create todoist-clone-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
heroku config:set API_VERSION=v1

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate --app todoist-clone-app
```

### Railway / Render

1. Connect GitHub repository
2. Set environment variables from `.env.example`
3. Deploy automatically on push

### DigitalOcean / AWS

1. Provision Ubuntu 22.04 server
2. Install Docker and Docker Compose
3. Clone repository
4. Configure `.env` files
5. Run `docker-compose up -d`
6. Set up Nginx reverse proxy
7. Install SSL with Certbot

---

## 📈 FUTURE ENHANCEMENTS

- [ ] Drag & drop for task reordering
- [ ] Kanban board view
- [ ] Dark mode
- [ ] Email notifications
- [ ] File attachments
- [ ] Task comments UI
- [ ] Collaboration (share projects)
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Productivity statistics

---

## 📄 LICENSE

MIT License - Free for personal and commercial use

---

## 👤 AUTHOR

**Andy Suarez Ricardo**
- GitHub: [@AndySuarezRicardo](https://github.com/AndySuarezRicardo)
- Repository: [todoist-clone](https://github.com/AndySuarezRicardo/todoist-clone)

---

## 🙏 ACKNOWLEDGMENTS

- Inspired by [Todoist](https://todoist.com)
- Built as a full-stack learning project
- Technologies: React, Node.js, PostgreSQL, Docker

---

## 🆘 SUPPORT

If you encounter issues:

1. Check [Troubleshooting](#-troubleshooting) section
2. Review logs: `docker-compose logs -f`
3. Open an issue on GitHub
4. Make sure Docker Desktop is running

---

⭐ **If this project helped you, please give it a star on GitHub!** ⭐
