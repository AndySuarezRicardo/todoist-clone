import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tasksAPI, projectsAPI, labelsAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { projectId } = useParams();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksRes, projectsRes, labelsRes] = await Promise.all([
        tasksAPI.getTasks({ project_id: projectId, completed: false }),
        projectsAPI.getProjects(),
        labelsAPI.getLabels()
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
      setLabels(labelsRes.data.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      await tasksAPI.createTask(taskData);
      loadData();
      setShowTaskForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      await tasksAPI.updateTask(taskId, updates);
      loadData();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await tasksAPI.deleteTask(taskId);
      loadData();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        projects={projects} 
        currentProjectId={projectId}
        onLogout={logout}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {projectId 
                ? projects.find(p => p.id === projectId)?.name 
                : 'Today'}
            </h1>
            <button
              onClick={() => setShowTaskForm(true)}
              className="btn btn-primary"
            >
              + Add Task
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
              labels={labels}
            />
          )}

          {showTaskForm && (
            <TaskForm
              projects={projects}
              labels={labels}
              onSubmit={handleTaskCreate}
              onCancel={() => setShowTaskForm(false)}
              defaultProjectId={projectId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
