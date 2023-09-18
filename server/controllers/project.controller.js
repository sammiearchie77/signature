const Project = require('../models/Project.model');


const create = async (req, res) => {
    const project = new Project(req.body)
    try {
        await project.save()
        return res.status(200).json({
            message: "Successfully created project!"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: `Project creation error: ${err}`
        })
    }
};

const list = async (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Project.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  }

const projectByID = async (req, res, next) => {
    const id = req.params.projectId;
    console.log(req)

    await Project.findById(id)
      .then(data => {
        console.log(data)
        if (!data)
          res.status(404).send({ message: "Not found Project with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Project with id=" + id });
      });
};

const read = (req, res) => {
    return res.json(req.profile)
};

const update = async (req, res, next) => {
    try {
        let project = req.profile;
        project = extend(project, req.body);
        project.updated = Date.now();
        res.status(201).json(project);
    } catch (err) {
        return res.status(400).json({ message: `Could not update, ${err} ` })
    }
};

const remove = async (req, res) => {
    try {
        let project = req.profile;
        let deletedProject = await project.remove();
        res.status(200).json(deletedProject)
    } catch (err) {
        return res.status(400).json({
            message: err
        })
    }
};

module.exports = {
    create, list, projectByID, read, update, remove
  }