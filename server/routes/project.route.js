// routes/tasks.js
import express from 'express';
const router = express.Router();
import projectController from '../controllers/project.controller'; 
import authController from '../controllers/auth.controller'
// Define routes for projects
router.get('/projects', authController.isAuthenticated, authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }), projectController.listProjects);
router.post('/projects/', authController.isAuthenticated,authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),  projectController.createProject);
router.put('/projects/:projectId', authController.isAuthenticated, authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }), projectController.updateProject);
// Add more routes using tasksController as needed

router.param('projectId', projectController.getProjectById)


export default router;
