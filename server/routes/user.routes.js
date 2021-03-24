const LoginRegController = require("../controllers/loginReg.controller");
const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/register", LoginRegController.register);
    app.post("/api/login", LoginRegController.login);
    // prevents hackers from getting into database
    app.get("/api/users", authenticate, UserController.index);
    app.get("/api/logout", authenticate, LoginRegController.logout);
}