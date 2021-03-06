var jwt = require("jsonwebtoken");
const _ = require("lodash");
const secretKey = process.env.SECRET_KEY || "key1234";

const getToken = obj => {
  return jwt.sign(obj, secretKey, {
    expiresIn: 86400 * 365 // 86400 sec = 24 hours
  });
};

const verify = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (_.isEmpty(token)) {
    return next();
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      return res
        .status(401)
        .send({ messages: ["Failed to authenticate token."] });
    } else {
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.role = decoded.role;
      next();
    }
  });
};

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (_.isEmpty(token)) {
    return res.status(403).send({ messages: ["no token provided."] });
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      return res
        .status(401)
        .send({ messages: ["Failed to authenticate token."] });
    } else {
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.role = decoded.role;
      next();
    }
  });
};

const verifyAdmin = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (_.isEmpty(token)) {
    return res.status(403).send({ messages: ["no token provided."] });
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      return res
        .status(401)
        .send({ messages: ["Failed to authenticate token."] });
    } else {
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.role = decoded.role;
      if (decoded.role.role_code !== "01ADM") {
        return res.status(403).json({
          messages: {
            title_en: "no permission",
            title_th: "ไม่มีสิทธิ์ในการเข้าถึง"
          }
        });
      }
      next();
    }
  });
};

const verifyCustomer = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (_.isEmpty(token)) {
    return res.status(403).send({ messages: ["no token provided."] });
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      return res
        .status(401)
        .send({ messages: ["Failed to authenticate token."] });
    } else {
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.role = decoded.role;
      if (decoded.role.role_code !== "02CUS") {
        return res.status(403).json({
          messages: {
            title_en: "no permission",
            title_th: "ไม่มีสิทธิ์ในการเข้าถึง"
          }
        });
      }
      next();
    }
  });
};

module.exports = { getToken, verify, verifyToken, verifyAdmin, verifyCustomer };
