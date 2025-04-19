import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token)
      res.status(403).json({
        message: "please login",
      });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await;
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};
