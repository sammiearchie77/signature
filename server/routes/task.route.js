// routes/tasks.js
import express from 'express';
const router = express.Router();
import taskController from '../controllers/task.controller'; 
import authController from '../controllers/auth.controller'


// Define routes for tasks
router.get('/tasks', authController.isAuthenticated, authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }), taskController.listTasks);
router.post('/tasks/', authController.isAuthenticated, authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }), taskController.createTask);
router.put('/task/:taskId', authController.isAuthenticated, authController.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }), taskController.updateTask);

router.param('taskId', taskController.getTaskById)


export default router;
