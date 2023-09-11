import admin from 'firebase-admin';
import express from 'express';
const router = express.Router();

// Initialize Firebase Admin SDK (as shown in previous responses)

// Reference to the Firebase Realtime Database
const db = admin.database();
const tasksRef = db.ref('tasks');

// Create a new task
const createTask = (req, res) => {
    const { title, description,
        dealine, priority, assignedTo, completed } = req.body;

    if (!title || !description || !priority || !assignedTo || !completed) {
        return res.status(400).json({ error: 'Incomplete task data.' });
    }

    const newtaskRef = tasksRef.push({
        title,
        description,
        dealine,
        priority,
        assignedTo,
        completed,
    });

    return res.status(201).json({ id: newtaskRef.key });
};

// Get all tasks
const listTasks = (req, res) => {
    try {
        tasksRef.once('value', (snapshot) => {
            const tasks = [];
            snapshot.forEach((childSnapshot) => {
                const task = childSnapshot.val();
                task.id = childSnapshot.key;
                tasks.push(task);
            });
            res.status(200).json(tasks);
        });
    } catch (err) {
        return res.status(500).json({
            message: `Something happened ${err}`
        })
    }
};

// Get a task by ID
const getTaskById = async (req, res, taskId, next) => {
    try {
        const { uid } = req.params;

        await tasksRef.child(taskId).once('value', (snapshot) => {
            const task = snapshot.val();
            if (!task) {
                return res.status(404).json({ error: 'task not found.' });
            }
            task.id = taskId;
            res.status(200).json(task);
            next();
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something happened"
        })
    }
};

// Update a task by ID
const updateTask = (req, res, next) => {
    try {
        const { uid } = req.params;
        const { title,
            description,
            dealine,
            priority,
            assignedTo,
            completed} = req.body;

        if (!title || !description || !dealine ||  !priority || !assignedTo || !completed) {
            return res.status(400).json({ error: 'Incomplete task data.' });
        }

        tasksRef.child(uid).update({
            title,
            description,
            dealine,
            priority,
            assignedTo,
            completed,
        });

        res.status(200).json({ message: 'task updated successfully.' });
    } catch (err) {
        return res.status(500).json({
            message: 'Something happened'
        })
    }
};

// Delete a task by ID
const deleteTask = (req, res, next) => {
    const { uid } = req.params;

    tasksRef.child(uid).remove()
        .then(() => {
            res.status(204).send({
                message: "Successfully removed task"
            });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Failed to delete the task.' });
        });
};

export default {
    createTask, listTasks, getTaskById, updateTask, deleteTask
}
