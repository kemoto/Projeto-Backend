const jwt = require("jsonwebtoken");

class Auth {
  validaAcesso(req, res, next) {
    const bearerToken = req.headers["authorization"] || "";
    let token = bearerToken.split(" ");

    if(token[0] == "Bearer") {
      token = token[1];
    }

    jwt.verify(token, "!123!", (err, obj) => {
      if(err) {
        res.json(err);
      } else {
        req.usuario = obj.usuario;
        next();
      }
    });
  } 
}

module.exports = Auth;