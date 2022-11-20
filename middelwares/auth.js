const protect = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
      data: null,
    });
  }
  req.user = req.session.user;
  next();
};

module.exports = protect;
