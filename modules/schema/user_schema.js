const mongoose = require('../../config/database');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    timezone: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
