const Task = require('../models/Task.model');


const create = async (req, res, next) => {
    const task = new Task(req.body);
    try {
        await task.save()
        return res.status(201).json({
            message: 'Task successfully created!'
        })
    } catch (err) {
        console.log(`Task create error: ${err}`)
        return res.status(400).json({ message: err})

    }
};

const list = async (req, res, next) => {
    try {
        let tasks = await Task.find();
        res.json(tasks)
    } catch(err){
        console.log(`Task list error: ${err}`)
        return res.status(400).json({ message: err})
    }
};

const search = async (req, res) => {
    try {
        const task = req.query.q;
        console.log(task)
        await Task.find({ title: task})
        res.json(200).json(task)
    } catch (err){
        return res.status(404).json({ message: err})
    }
};

const taskByID = async (req, res, next, id) => {
    try {
        let task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found'});
        req.profile = task;
        next();
    } catch (err) {
        console.log(`taskById error: ${err}`)
        return res.status(400).json({ message: err})
    }
};

const read = (req, res) => {
    return res.json(req.profile)
};

const update = async (req, res, next) => {
    try {
        let task = req.profile;
        task = extend(task, req.body);
        task.updated = Date.now();
        res.status(201).json(task);
    } catch (err) {
        console.log(`Update error: ${err}`)
        return res.status(400).json({ message: `Could not update, ${err} `})
    }
};

const remove = async (req, res) => {
    try {
        let task = req.profile;
        let deletedTask = await task.remove();
        res.status(200).json(deletedTask)
    } catch (err) {
        console.log(`Remove error: ${err}`)
        return res.status(400).json({
            message: err
        })
    }
};

module.exports = {
    create, list, taskByID, read, update, remove, search
  }