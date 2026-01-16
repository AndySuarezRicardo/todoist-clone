import React, { useState } from 'react';
import { FiCircle, FiCheckCircle, FiTrash2, FiEdit } from 'react-icons/fi';

const priorityColors = {
  1: 'text-gray-400',
  2: 'text-blue-500',
  3: 'text-yellow-500',
  4: 'text-red-500'
};

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggleComplete = () => {
    onUpdate(task.id, { is_completed: !task.is_completed });
  };

  const handleSaveEdit = () => {
    onUpdate(task.id, { title });
    setIsEditing(false);
  };

  return (
    <div className="card hover:shadow-md transition group">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className={\`mt-1 \${priorityColors[task.priority]}\`}
        >
          {task.is_completed ? <FiCheckCircle size={20} /> : <FiCircle size={20} />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              className="input"
              autoFocus
            />
          ) : (
            <div>
              <h3
                className={\`font-medium \${task.is_completed ? 'line-through text-gray-400' : ''}\`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              )}
              {task.labels && task.labels.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {task.labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
