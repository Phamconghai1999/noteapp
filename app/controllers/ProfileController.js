class ProfileController {
  // [GET] domain.com/me/profile
  index(req, res, next) {
    res.render("me/profile");
  }
}

module.exports = new ProfileController(); // export class
