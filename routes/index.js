const express = require("express");
const router = express.Router();

router.get("/", function (_req, res) {
  res.status(200).json({ message: "success" });
});

module.exports = router;
