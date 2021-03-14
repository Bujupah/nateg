## Nateg


### Requirements
  - [Nodejs](https://nodejs.org/en/download/)
  - [VScode](https://code.visualstudio.com/)
  - [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - [JSON-Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?utm_source=chrome-ntp-icon)

### Create nodejs project

```
npm init
npm install body-parse express nodemon
```

IF you pull this project just run this command
```
npm i
```

### Dependencies
```json
{
    "body-parser": "^1.19.0", // To parse the request body with express
    "express": "^4.17.1", // Web app
    "monk": "^7.3.3", // To connect with mongodb
    "nodemon": "^2.0.7", // For development
    "bcrypt": "^5.0.1", // To encrypt, decrypt and verify
    "dotenv": "^8.2.0", // To add virtual env variables
    "express-async-handler": "^1.1.4", // For error handling
    "jsonwebtoken": "^8.5.1", // Json Web Toekn for authorization
}
```