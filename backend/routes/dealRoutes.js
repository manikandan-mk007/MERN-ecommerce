const express = require("express");

const {
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

const router = express.Router();

router.get("/", getDeals);
router.post("/", addDeal);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);

module.exports = router;