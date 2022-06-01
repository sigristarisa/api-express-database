const express = require("express");
const router = express.Router();
const db = require("../../db");

/* GET REQUEST BY ID */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM pets WHERE id=${id}`;
  const result = await db.query(query);

  res.json({ pet: result.rows[0] });
});

/*  GENERAL GET REQUEST AND BY TYPE */
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

/* PUT REQUEST */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, type, breed, microchip } = req.body;
  const values = [];
  const sqlArray = [];
  const sqlCondition = ` WHERE id=${id} RETURNING *`;
  let valueNum = 1;

  if (name) {
    values.push(name);
    sqlArray.push(`name=$${valueNum}`);
    valueNum++;
  }
  if (age) {
    values.push(age);
    sqlArray.push(`age=$${valueNum}`);
    valueNum++;
  }
  if (type) {
    values.push(type);
    sqlArray.push(`type=$${valueNum}`);
    valueNum++;
  }
  if (breed) {
    values.push(breed);
    sqlArray.push(`breed=$${valueNum}`);
    valueNum++;
  }
  if (microchip) {
    values.push(microchip);
    sqlArray.push(`microchip=$${valueNum}`);
    valueNum++;
  }

  const sqlString = "UPDATE pets SET " + sqlArray.join(", ") + sqlCondition;

  const result = await db.query(sqlString, values);

  res.json({ pet: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const sqlString = `DELETE FROM pets WHERE id=${id} RETURNING *`;

  const result = await db.query(sqlString);

  res.json({ pet: result.rows[0] });
});
module.exports = router;
