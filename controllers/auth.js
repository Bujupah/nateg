const asyncHandler = require("express-async-handler");
const service = require("../services/auth");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  console.log(req.body);
  const token = await service.login(email, password);
  res.status(200).json({token});
});

const register = asyncHandler(async (req, res, next) => {
  const token = await service.register(req.body);
  res.status(200).json({token});
});

module.exports = {
  login,
  register,
};
