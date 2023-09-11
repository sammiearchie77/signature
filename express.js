import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helment from 'helmet'
import socketIo from 'socket.io';
import morgan from 'morgan';
import path from 'path'
const CURRENT_WORKING_DIR = process.cwd();
import admin from 'firebase-admin'


import userRouters from './server/routes/user.route';
import taskRouters from './server/routes/task.route';
import authRouters from './server/routes/auth.route';
import projectRouters from './server/routes/project.route';


const app = express()



// mount apps for use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(compress())
app.use(helment())
app.use(cors())
app.use(express.json());

// // Middleware to authenticate the user
// router.use(async (req, res, next) => {
//   const idToken = req.headers.authorization;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken; // Store the user data in req.user
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Authentication failed.' });
//   }
// });

// Mount routes
// app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/', userRouters);
app.use('/api/v1/', authRouters);
app.use('/api/v1/', taskRouters);
app.use('/api/v1/', projectRouters);


app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


export default app;