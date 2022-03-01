const express = require("express");
const router = express.Router();
const transfertCtrl = require("./../controllers/transfert");

router.post("/identity", transfertCtrl.identity);
router.post("/civilregistration", transfertCtrl.civilRegistration);
router.post("/rib", transfertCtrl.rib);
router.post("/migration", transfertCtrl.migration);



module.exports = router;