const mongoose = require('../../config/database');
const Schema = mongoose.Schema;


const reminderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    reminderTimeUTC: { type: Date, required: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);
