'use strict';


module.exports.authorizedUser= function(req, res, next) {
    let user_id = req.session.id;
    if (user_id) {
      next();
    } else {
      res.redirect(401, '/');
    }
  };

module.exports.isAdmin = function(req, res, next) {
    let admin = req.session.admin;
    if (admin === true) {
      next();
    } else {
      res.redirect(401, '/');
    }
};
