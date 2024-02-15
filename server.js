const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const global = require('./config/constant');
const { body, validationResult } = require('express-validator');
const moment = require('moment-timezone');
const User = require('./modules/schema/user_schema');
// const Reminder = require('./../../schema/remainder_schema');
const cron = require('node-cron');
const reminders = [];


app.use(bodyParser.json());
app.use(cookieParser());


let route_v1 = require('./modules/v1/route');
const common = require('./config/common');


const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', (socket) => {
    console.log('WebSocket client connected');
});

// WebSocket event for disconnect
io.on('disconnect', (socket) => {
    console.log('WebSocket client disconnected');
});

// const server = app.listen(global.PORT);
console.log("Server connected with port: " + global.PORT);



app.use('/api/v1', route_v1);

app.post('/api/v1/remainder/schedule_reminder', common.validate_token, [
    body('reminderTime').notEmpty().withMessage('Reminder time is required'),
    body('title').notEmpty().withMessage('Title is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.userId;
        const { reminderTime, title } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const timezone = user.timezone;

        const reminderTimeUserTz = moment.tz(reminderTime, timezone);
        const currentTime = moment().tz(timezone);
        const timeDifference = reminderTimeUserTz.diff(currentTime);
        
        // const cronSchedule = common.calculateCronSchedule(reminderTimeUserTz);
        // console.log(cronSchedule);
        setTimeout(() => {
            console.log(`Reminder triggered for user ${userId} at ${reminderTimeUserTz.format()}`);
            io.emit('reminderTriggered', { userId, reminderTime: reminderTimeUserTz, title });
        }, timeDifference);

        reminders.push({ userId, reminderTime: reminderTimeUserTz, timezone, title });

        res.status(200).json({ message: 'Reminder scheduled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/v1/remainder/reminders', common.validate_token, (req, res) => {
    const userId = req.userId;
    const userReminders = reminders.filter(reminder => reminder.userId === userId);
    res.status(200).json(userReminders);
});


// Start the server
const PORT = global.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
