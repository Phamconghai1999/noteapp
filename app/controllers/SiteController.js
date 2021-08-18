class SiteController {
  // [GET] /
  index(req, res, next) {
    res.render("auth/login", { layout: false });
  }
}

module.exports = new SiteController(); // export class
