const config = require('./config/config');
const app = require('./express');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise
mongoose.set('strictQuery', false);
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello Server...'})
})

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})