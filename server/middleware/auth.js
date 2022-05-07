import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ").length !== 2 ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      throw new Error();
    }

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    const decodedData = isCustomAuth
      ? jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      : jwt.decode(token);

    req.headers.user = {
      name: decodedData.name,
      userId: isCustomAuth ? decodedData.userId : decodedData.sub,
    };
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message || "Not authenticated.",
    });
  }
};
