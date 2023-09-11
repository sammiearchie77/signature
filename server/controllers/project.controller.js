import admin from 'firebase-admin';
import express from 'express';
const router = express.Router();

// Initialize Firebase Admin SDK (as shown in previous responses)

// Reference to the Firebase Realtime Database
const db = admin.database();
const projectsRef = db.ref('projects');

// Create a new project
const createProject = (req, res) => {
    const { name, description, team, startDate, endDate } = req.body;

    if (!name || !description || !team || !startDate || !endDate) {
        return res.status(400).json({ error: 'Incomplete project data.' });
    }

    const newProjectRef = projectsRef.push({
        name,
        description,
        team,
        startDate,
        endDate,
    });

    return res.status(201).json({ id: newProjectRef.key });
};

// Get all projects
const listProjects = (req, res) => {
    try {
        projectsRef.once('value', (snapshot) => {
            const projects = [];
            snapshot.forEach((childSnapshot) => {
                const project = childSnapshot.val();
                project.id = childSnapshot.key;
                projects.push(project);
            });
            res.status(200).json(projects);
        });
    } catch (err) {
        return res.status(500).json({
            message: `Something happened ${err}`
        })
    }
};

// Get a project by ID
const getProjectById = async (req, res, projectId, next) => {
    try {
        const { uid } = req.params;

        await projectsRef.child(projectId).once('value', (snapshot) => {
            const project = snapshot.val();
            if (!project) {
                return res.status(404).json({ error: 'Project not found.' });
            }
            project.id = projectId;
            res.status(200).json(project);
            next();
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something happened"
        })
    }
};

// Update a project by ID
const updateProject = (req, res, next) => {
    try {
        const { uid } = req.params;
        const { name, description, team, startDate, endDate } = req.body;

        if (!name || !description || !team || !startDate || !endDate) {
            return res.status(400).json({ error: 'Incomplete project data.' });
        }

        projectsRef.child(uid).update({
            name,
            description,
            team,
            startDate,
            endDate,
        });

        res.status(200).json({ message: 'Project updated successfully.' });
    } catch (err) {
        return res.status(500).json({
            message: 'Something happened'
        })
    }
};

// Delete a project by ID
const deleteProject = (req, res, next) => {
    const { uid } = req.params;

    projectsRef.child(uid).remove()
        .then(() => {
            res.status(204).send({
                message: "Successfully removed project"
            });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Failed to delete the project.' });
        });
};

export default {
    createProject, listProjects, getProjectById, updateProject, deleteProject
}
