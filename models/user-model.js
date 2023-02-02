const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        admin: { type: Boolean, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User);