const express = require("express");
const router = express.Router();
const db = require("../../db");

/* GENERAL GET REQUEST */
// router.get("/", async (req, res) => {
//   const query = "SELECT * FROM pets";
//   const result = await db.query(query);
//   res.json({ pets: result.rows });
// });

/* GET REQUEST BY ID */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM pets WHERE id=${id}`;
  const result = await db.query(query);

  res.json({ pet: result.rows[0] });
});

/* GET REQUEST BY TYPE */
router.get("/", async (req, res) => {
  const type = req.query.type;
  const microchip = req.query.microchip;
  let sqlString = "SELECT * FROM pets ";
  let sqlLimit = "LIMIT ";
  let sqlOffset = "OFFSET ";

  if (type && microchip) {
    sqlString += `WHERE type='${type}' AND microchip='${microchip}';`;
  } else if (type) {
    sqlString += `WHERE type='${type}';`;
  } else if (microchip) {
    sqlString += microchip = "${microchip}";
  }

  const result = await db.query(sqlString);
  res.json({ pets: result.rows });
});

/* POST REQUEST */
router.post("/", async (req, res) => {
  const newPet = req.body;
  const { name, age, type, breed, microchip } = newPet;

  const query = `INSERT INTO pets
  (name, age, type, breed, microchip)
  VALUES('${name}', ${age}, '${type}', '${breed}', ${microchip})
  RETURNING *`;

  const result = await db.query(query);

  res.json({ pet: result.rows[0] });
});

module.exports = router;
