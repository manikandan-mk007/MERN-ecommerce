const express = require("express");
const { getAdminReports } = require("../controllers/reportController");

const router = express.Router();

router.get("/admin", getAdminReports);

module.exports = router;