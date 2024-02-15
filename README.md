# To run this project follow below mentioned instructions
***

You must have node 16 or latest, If not download node from official site\
[Click here to download Nodejs](https://nodejs.org/ene)

You must have latest mongoDb insalled, If not download from official site\
[Click here to download MongoDB](https://www.mongodb.com/try/download/community)

Run cmd: ```git clone https://github.com/vijaykaushik1/timezone-aware-Reminder-API-with-Cron-Jobs.git```\
cmd: ```npm i```
cmd: ```npm start```

hit all the below mention apis using params in body:\
***create_account api -***\
POST Method:``` http://localhost:5002/api/v1/user/create_account```\
params - {
    "username":"Backend Dev",
    "email":"backend@gmail.com",
    "password":"123456",
    "timezone": "Asia/Kolkata"
}

***login api -***\
POST Method: ```http://localhost:5002/api/v1/user/login```\
params -{
    "email":"backend@gmail.com",
    "password":"123456"
}

***schedule_reminder api -***\
POST Method:```http://localhost:5002/api/v1/remainder/schedule_reminder```\
Headers Key-Authorization Value-JwtToken received in login or create account api \
params -{
  "reminderTime": "2024-09-15T22:53:00Z",
  "title": "Meeting with Team 22:53:00"
}

***get reminders-***\
GET Method: ```http://localhost:5002/reminders```\
Headers Key-Authorization Value-JwtToken received in login or create account api\
You will receive all the remiander which you have set.\

***set timezone-***\
GET Method: ```http://localhost:5002/api/v1/user/set_timezone```\
Headers Key-Authorization Value-JwtToken received in login or create account api\
{
    "timezone":"Asia/Kolkata"
}

##### If you find any difficulty then import Timezone-Aware-Nodejs-Task.postman_collection in postman, It is situated in root directory of project and use it.