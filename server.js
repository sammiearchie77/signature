const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const tasksRouter = require('./server/routes/tasks.route');
const usersRouter = require('./server/routes/users.route');
const authRoutes = require('./server/routes/auths.route');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Mount routes
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRoutes);


app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
app.get('', (req, res) => {
    res.send('Welcome to signature\n').sendStatus(200);
})

// Socket.io logic here

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
