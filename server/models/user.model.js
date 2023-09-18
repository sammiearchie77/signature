const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      email: String,
      password: String,
  },{ timestamps: true }
  )
);

User.schema.method("toJson", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

module.exports = User;