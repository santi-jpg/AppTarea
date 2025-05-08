import { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Obtener tareas del backend
  const fetchTasks = () => {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => {
        
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Agregar nueva tarea
  const addTask = () => {
    if (newTask.trim() === '') return;
    fetch('http://localhost:3000/api/tasks/{_id}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  // Marcar tarea como completada
  const toggleTask = (_id) => {
    if (!_id) {
      console.error('Task ID is undefined');
      return;
    }
    const task = tasks.find(t => t._id === _id);
    if (!task) {
      console.error(`Task with ID ${_id} not found`);
      return;
    }
    fetch(`http://localhost:3000/api/tasks/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
      })
      .then(updatedTask => {
        setTasks(tasks.map(t => (t._id === _id ? updatedTask : t)));
      })
      .catch(error => console.error('Error updating task:', error));
  };

  // Eliminar tarea
  const deleteTask = (_id) => {
    if (!_id) {
      console.error('Task ID is undefined');
      return;
    }
    fetch(`http://localhost:3000/api/tasks/${_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete task');
        fetchTasks(); // Volver a cargar las tareas desde el backend
      });
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Tus Tareas</h2>
      <div className="flex mb-4">
        
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task._id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleTask(task._id)}
                className={`px-2 py-1 mr-2 rounded ${
                  task.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                } hover:opacity-80`}
              >
                {task.completed ? 'Completada' : 'Completar'}
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </div>
            


<button
  onClick={() => deleteTask(task._id)}
  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
>
  Eliminar
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;