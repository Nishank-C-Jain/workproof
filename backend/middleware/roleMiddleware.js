const orgAdminOnly = (req, res, next) => {
  if (req.user.role !== "org") {
    return res.status(403).json({
      message: "Access denied. Organization admin only.",
    });
  }
  next();
};

export default orgAdminOnly;
