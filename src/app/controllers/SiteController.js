const Course = require('../models/Course');

class SiteController {
  // *[GET] /
  home(req, res, next) {
    Course.find({})
      .lean()
      .then((course) => res.render('home', { course }))
      // * 2 cach de viet catch
      // * .catch(next) --> cách này cũng giống cách dưới
      .catch((error) => next(error));

    // res.render("home");
  }

  // *[GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
