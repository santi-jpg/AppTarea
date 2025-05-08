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
            <Route path="/tareas" element={<TaskList />} /> 
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/register" element={<RegisterForm/>} /> 
            ,<Route path="/nueva-tarea" element={<TaskForm />} /> 
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
