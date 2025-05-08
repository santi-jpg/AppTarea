import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginForm from './components/Auth/LoginForm'; 
import RegisterForm from './components/Auth/RegisterForm';
import TaskForm  from './components/TaskForm'; 
import TaskList from './pages/TaskList';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tareas" element={<TaskList />} /> {/* Puedes tener una ruta específica para las tareas */}
            <Route path="/login" element={<LoginForm />} /> {/* Nueva ruta para el formulario de login */}
            <Route path="/register" element={<RegisterForm/>} /> {/* Nueva ruta para el formulario de login */}
            ,<Route path="/nueva-tarea" element={<TaskForm />} /> {/* Nueva ruta para el formulario de tareas */}
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;