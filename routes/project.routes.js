var express = require("express");
var router = express.Router();

const projectCtrl = require("../controllers/project");
const authCtrl = require("../controllers/auth");

router
    .route("/projects")
    .post(authCtrl.requireSignin, projectCtrl.create)
    .get(authCtrl.requireSignin, projectCtrl.getAll);

router
    .route("/projects/:projectId")
    .get(authCtrl.requireSignin, projectCtrl.getOne)
    .patch(authCtrl.requireSignin, projectCtrl.update)
    .delete(authCtrl.requireSignin, projectCtrl.remove);

module.exports = router;
