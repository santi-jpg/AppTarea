import Task from '../models/taskModel.js';

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const { title, description,  completed  } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const task = new Task({ title, description , completed : completed || false });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};



// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description , completed  } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};