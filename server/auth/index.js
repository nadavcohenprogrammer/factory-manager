const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const bcrypt = require("bcryptjs");

const createJWTToken = (email, name) => {
  const token = jwt.sign({ email, name }, SECRET, { noTimestamp: true });
  return token;
};

const isValidToken = (req) => {
  try {
    const { token } = req.cookies;
    const jwtPayload = jwt.verify(token, SECRET);
    req.user = jwtPayload;
    return true;
  } catch (err) {
    return false;
  }
};

const fetchToken = (token) => {
  const jwtPayload = jwt.verify(token, SECRET);
  return jwtPayload;
};

const createPassword = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

const createRandomSalt = () => bcrypt.genSaltSync(10);

module.exports = {
  createJWTToken,
  isValidToken,
  createPassword,
  createRandomSalt,
  fetchToken,
};
