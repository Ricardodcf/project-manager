var express = require("express");
var router = express.Router();

const userCtrl = require("../controllers/user");
const authCtrl = require("../controllers/auth");
const { getUser, validateAdmin } = require("../helpers/middleware");

router
    .route("/users")
    .post(authCtrl.requireSignin, getUser, validateAdmin, userCtrl.create)
    .get(authCtrl.requireSignin, getUser, validateAdmin, userCtrl.getAll);

router.route("/users-admin").post(userCtrl.createAdmin);

router
    .route("/users/:userId")
    .get(authCtrl.requireSignin, getUser, userCtrl.getOne)
    .patch(authCtrl.requireSignin, getUser, validateAdmin, userCtrl.update)
    .delete(authCtrl.requireSignin, getUser, validateAdmin, userCtrl.remove);

module.exports = router;
