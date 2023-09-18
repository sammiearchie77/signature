const User = require('../models/user.model')
const errorHandler = require('../helpers/dbErrorHandler')
let bcrypt = require("bcrypt");
const binarySearch = require('../helpers/binarySearch');

const create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Check if a user with the same name already exists
    const existingUserWithName = await User.findOne({ firstname, lastname });
    if (existingUserWithName) {
      return res.status(400).json({ message: 'Name is already in use' });
    }

    // If no duplicate email or name is found, create the user
    const user = new User({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    user.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }

      return res.status(201).json({
        message: 'Successfully signed up!',
      });
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
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

const userByID = async (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

const read = (req, res) => {
  console.log(req)
  return res.json(req)
}


const searchByUsername = async (req, res) => {
  const usernameToSearch = req.query.firstname // Get the username to search from the query string

  try {
    // Fetch all users and sort them by username
    const users = await User.find().sort({ firstname: 1 });

    // Perform binary search
    const foundUser = binarySearch(users, usernameToSearch);

    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}
const remove = async (req, res) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
}

module.exports = {
  create, list, userByID, read, searchByUsername, update, remove
}