const express = require("express");
const router = express.Router();
const apiCtrl = require("./../controllers/apiCegid");

router.post("/get", apiCtrl.getDataAPI);
router.post("/post",apiCtrl.postApi);
router.post("/put",apiCtrl.putApi);
module.exports = router;