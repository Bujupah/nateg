const createError = require("http-errors");
const bcrypt = require("bcrypt");


const monk = require("monk");
const db = monk(process.env.DB_URL);
const users = db.get("users");

const { generateJWT } = require('../utils/jwt_auth');
const { sendWelcomeMail } = require("./mailer");

const login = async (email, password) => {
  if (!email || !password) {
    throw createError(400, "Please provide a valid email and password!");
  }
  
  const user = await users.findOne({ email })

  // TODO: Check if password correct
  if (bcrypt.compareSync(password, user.hashedpassword)) {
    return generateJWT(user)
  } else {
    throw createError(400, "Invalid password!");
  }
};

const register = async (newuser) => {
  if (
    !newuser &&
    !newuser.first_name &&
    !newuser.last_name &&
    !newuser.email &&
    !newuser.password &&
    !newuser.phone
  ) {
    throw createError(400, "User is missing data!");
  }

  let user = await users.findOne({ email: newuser.email });
  if (user) {
    throw createError(400, "Email is already in use!");
  }

  const hashedpassword = bcrypt.hashSync(newuser.password, 10);

  const toSave = {
    first_name: newuser.first_name,
    last_name: newuser.last_name,
    email: newuser.email,
    hashedpassword: hashedpassword,
    phone: newuser.phone,
  } 
  
  const saved = await users.insert(toSave)
  const jwt = generateJWT(saved)

  await sendWelcomeMail(toSave);

  return jwt
};

module.exports = { login, register };
