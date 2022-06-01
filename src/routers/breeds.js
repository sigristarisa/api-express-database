const express = require("express");
const router = express.Router();
const db = require("../../db");

/* GET REQUEST BY BREED AND TYPE */
router.get("/", async (req, res) => {
  const type = req.query.type;
  const query = `SELECT breed FROM pets WHERE type='${type}'`;
  const result = await db.query(query);
  const allBreeds = result.rows;

  const removeDups = new Map(
    allBreeds.map((breedName) => [breedName.breed, breedName])
  );

  console.log(removeDups);

  const newResult = [...removeDups.values()];
  res.json({ breeds: newResult });
});

module.exports = router;
