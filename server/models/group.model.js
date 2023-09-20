const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Ensure that group names are unique
        },
        description: {
            type: String,
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }],
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects',
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("groups", groupSchema);