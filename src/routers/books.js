const express = require("express");
const router = express.Router();
const db = require("../../db");

// router.get("/", async (req, res) => {
//   const query = "SELECT * FROM books;";
//   const result = await db.query(query);
//   res.json({ books: result.rows });
// });

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM books WHERE id=${id}`;
  const result = await db.query(query);
  res.json({ book: result.rows[0] });
});

router.get("/", async (req, res) => {
  const type = req.query.type;
  console.log("This is type: ", type);
  const query = `SELECT * FROM books WHERE type='${type}'`;
  const result = await db.query(query);
  console.log("this is result: ", result);
  res.json({ books: result.rows });
});

router.get("/?type=non_fiction", async (req, res) => {
  const query = `SELECT * FROM books WHERE type='Non-Fiction'`;
  const result = await db.query(query);
  res.json({ books: result.rows });
});

module.exports = router;
