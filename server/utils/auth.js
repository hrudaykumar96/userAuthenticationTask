const Users = require("../modules/users/users.models.js");
const { decryptData } = require("../utils/encryption.js");

async function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    
    const user = await Users.findById(req.session.userId);

    const authuser = {
      name: decryptData(user.name),
      email: decryptData(user.email),
    };
    req.user = authuser;
    return next();
  }
  return res.status(401).json({ error: "Unauthorized. Please login." });
}


module.exports = { isAuthenticated } 