import React from 'react';
import { Link } from 'react-router-dom';
import { FiInbox, FiCalendar, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ projects, currentProjectId, onLogout }) => {
  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary">Todoist Clone</h2>
      </div>

      <nav className="space-y-2">
        <Link
          to="/"
          className={\`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition \${!currentProjectId ? 'bg-gray-200' : ''}\`}
        >
          <FiInbox />
          <span>Inbox</span>
        </Link>

        <Link
          to="/today"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FiCalendar />
          <span>Today</span>
        </Link>
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Projects</h3>
        <div className="space-y-1">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={\`/project/\${project.id}\`}
              className={\`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition \${currentProjectId === project.id ? 'bg-gray-200' : ''}\`}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="truncate">{project.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2 mt-auto absolute bottom-4 hover:bg-gray-200 rounded-lg transition"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
