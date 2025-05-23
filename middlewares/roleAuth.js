const roleAuth = (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
      }
      next();
    };
  };
  
  module.exports = roleAuth;
  