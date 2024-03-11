const jwt = require('jsonwebtoken');


const generateAccessToken = (id,name,role) => {
    return jwt.sign({userId:id,name,role},process.env.JSW_WEB_TOKEN_SECRETKEY)
};

module.exports = {generateAccessToken}