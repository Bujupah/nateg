const { verifyJWT } = require("../utils/jwt_auth");
const monk = require("monk");
const db = monk(process.env.DB_URL);
const users = db.get("users");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Access denied!",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const email = verifyJWT(token).email;
    let user = await users.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist!" });
    }

    if (!user.enabled) {
      res.status(400).json({ message: "User is not enabled!" });
    }

    // TODO: optional check if user is manager or not
    // if (!user.manager) {
    //   throw createError(401, "Access denied!");
    // }

    res.locals.user = req.body;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = {
  authenticateJWT,
};
