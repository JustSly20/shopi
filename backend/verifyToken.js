import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json("Not Authorized to Access This Route!");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SEC);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json("Not Authorized to Access This Route!");
  }
};

export const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userID === req.params.id && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Sorry, You Are Not Authorized!");
    }
  });
};
export default verifyToken;
