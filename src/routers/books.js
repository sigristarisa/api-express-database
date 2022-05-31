const express = require("express");
const router = express.Router();
const db = require("../../db");

/* GENERAL GET REQUEST */
// router.get("/", async (req, res) => {
//   const query = "SELECT * FROM books;";
//   const result = await db.query(query);
//   res.json({ books: result.rows });
// });

/* GET REQUEST ACCORDING TO SPECIFIC ID*/
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM books WHERE id=${id}`;
  const result = await db.query(query);
  res.json({ book: result.rows[0] });
});

/* GET REQUEST ACCORDING TO TYPE*/
// url: (e.g) http://localhost:3030/books?type=Fiction
router.get("/", async (req, res) => {
  const type = req.query.type;
  console.log("This is type: ", type);
  const query = `SELECT * FROM books WHERE type='${type}'`;
  const result = await db.query(query);
  console.log("this is result: ", result);
  res.json({ books: result.rows });
});

/* POST REQUEST */
router.post("/", async (req, res) => {
  const newBook = req.body;
  console.log("this is newBook: ", newBook);
  const { title, type, author, topic, publicationDate, pages } = newBook;

  const query = `INSERT INTO books
  (title, type, author, topic, publicationDate, pages)
  VALUES('${title}', '${type}', '${author}', '${topic}', '${publicationDate}', '${pages}');`;

  const addNewBook = await db.query(query);

  res.json({ books: addNewBook.rows });
});

module.exports = router;
