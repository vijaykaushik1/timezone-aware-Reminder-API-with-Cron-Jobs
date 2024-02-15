const global = require('./constant');
const jwt = require('jsonwebtoken');

const common = {
    validate_token: (req, res, next) => {
        const path_data = req.path.split("/");

        const method = new Array("login", "create_account");
        if (method.indexOf(path_data[2]) === -1) {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            jwt.verify(token, global.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                req.userId = decoded.userId;
                next();
            });
        } else {
            next();
        }
    },
    
    calculateCronSchedule: (reminderTime) => {
        const minute = reminderTime.minute();
        const hour = reminderTime.hour();
        const dayOfMonth = reminderTime.date();
        const month = reminderTime.month() + 1;
        return `${minute} ${hour} ${dayOfMonth} ${month} *`;
    }
}

module.exports = common;