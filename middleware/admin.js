const jwt = require('jsonwebtoken');

const { JWT_ADMIN_PASSWORD } = require("../config/config");

async function adminmiddleware(req,res,next) {
    const token = req.headers.token;
    const decoded = await jwt.verify(token,JWT_ADMIN_PASSWORD);

    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            mesaage : "You are not signed in"
        })
    }
}

module.exports = {
      adminmiddleware : adminmiddleware
}