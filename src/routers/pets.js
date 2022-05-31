const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM pets";
  const result = await db.query(query);
  res.json({ pets: result.rows });
});

module.exports = router;
