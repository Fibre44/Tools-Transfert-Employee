const express = require("express");
const router = express.Router();
const sessionCtrl = require("./../controllers/session");

router.get("/", sessionCtrl.createSession);

module.exports = router;