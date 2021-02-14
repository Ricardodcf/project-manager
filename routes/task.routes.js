var express = require("express");
var router = express.Router();

const taskCtrl = require("../controllers/task");
const authCtrl = require("../controllers/auth");

router
    .route("/tasks")
    .post(authCtrl.requireSignin, taskCtrl.create)
    .get(authCtrl.requireSignin, taskCtrl.getAll);

router
    .route("/tasks/:taskId")
    .get(authCtrl.requireSignin, taskCtrl.getOne)
    .patch(authCtrl.requireSignin, taskCtrl.update)
    .delete(authCtrl.requireSignin, taskCtrl.remove);

module.exports = router;
