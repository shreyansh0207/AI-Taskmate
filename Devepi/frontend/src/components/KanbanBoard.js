import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CardQA from './CardQA';
import TaskEditDelete from './TaskEditDelete';
import Modal from './Modal';
import TaskForm from './TaskForm';

const API_BASE = 'http://localhost:5000/api';

export default function KanbanBoard({ projectId }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingTaskToColumn, setAddingTaskToColumn] = useState(null);

  const fetchData = () => {
    if (!projectId) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    Promise.all([
      axios.get(`${API_BASE}/columns/project/${projectId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
      axios.get(`${API_BASE}/tasks/project/${projectId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    ]).then(([colRes, taskRes]) => {
      setColumns(colRes.data);
      setTasks(taskRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(fetchData, [projectId]);

  const handleTaskCreated = () => {
    fetchData();
    setAddingTaskToColumn(null);
  };

  if (loading) return <div>Loading board...</div>;

  const tasksByColumn = columns.reduce((acc, col) => {
    acc[col._id] = tasks.filter(task => task.status === col.name);
    return acc;
  }, {});

  return (
    //  👇 FIX IS HERE: Added the opening React Fragment tag <>
    <>
      <div className="kanban-board">
        {columns.map(col => (
          <div key={col._id} className="kanban-column">
            <div className="column-header">
              <h3>{col.name}</h3>
              <span>{tasksByColumn[col._id]?.length || 0}</span>
            </div>
            <DndContext collisionDetection={closestCenter}>
              <SortableContext items={tasksByColumn[col._id] || []} strategy={verticalListSortingStrategy}>
                <div className="card-list">
                  {(tasksByColumn[col._id] || []).map(task => (
                    <div key={task._id} className="kanban-card">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <TaskEditDelete task={task} columns={columns} onUpdated={fetchData} />
                      <CardQA taskId={task._id} />
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <button className="add-task-btn" onClick={() => setAddingTaskToColumn(col)}>+ Add Task</button>
          </div>
        ))}
      </div>

      {addingTaskToColumn && (
        <Modal isOpen={!!addingTaskToColumn} onClose={() => setAddingTaskToColumn(null)} title="Create New Task">
          <TaskForm
            projectId={projectId}
            columns={columns}
            initialStatus={addingTaskToColumn.name}
            onTaskCreated={handleTaskCreated}
            onCancel={() => setAddingTaskToColumn(null)}
          />
        </Modal>
      )}
    </>
    // 👆 FIX IS HERE: Added the closing React Fragment tag </>
  );
}