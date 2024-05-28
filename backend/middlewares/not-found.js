const NotFoundMiddleware = (req, res) => {
  return res.status(404).json({ message: "Route doesnot exist." });
};

export default NotFoundMiddleware;
