const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_DURATION,
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN_SECRET)
}


module.exports = { generateJWT, verifyJWT }
