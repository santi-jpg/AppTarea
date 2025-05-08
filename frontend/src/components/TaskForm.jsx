import React, { useState } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
   
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description,  }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Tarea creada con éxito');
        setIsError(false);
        setTitle('');
        setDescription('');
       
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Error al crear la tarea');
        setIsError(true);
      }
    } catch (error) {
      console.log('Error:', error);
      setMessage('Error de conexión con el servidor');
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {message && (
        <div className={isError ? 'error-message' : 'success-message'}>{message}</div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Titulo:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" // Cambiado a "text"
          id="description"
          value={description} // Corregido a "description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Crear Tarea
      </button>
    </form>
  );
}

export default TaskForm;