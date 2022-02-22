const express = require("express");
const router = express.Router();
const optionCtrl = require("./../controllers/options");

router.post("/", optionCtrl.createOption);

module.exports = router;