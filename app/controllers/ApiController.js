class ApiController {
  // [GET] domain.com/api/avatar/:id
  avatar(req, res, next) {
    res.json({ avatarId: req.params.id });
  }
}

module.exports = new ApiController(); // export class
