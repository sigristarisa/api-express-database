const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM pets";
  const result = await db.query(query);
  res.json({ pets: "hello" });
});

module.exports = router;
