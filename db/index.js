//Load our .env file
require('dotenv').config()

//Require the postgres library
const { Client } = require("pg");

//Get the connection string from process.env -
//the dotenv library sets this variable based
//on the contents of our env file

const connection = process.env.NODE_ENV === 'test' ? process.env.PGURL : process.env.PGURL_TEST;

//Create a new connection to the database. Client
//is an object provided to use by the postgres library
const db = new Client(connection);

//Connect to the database
db.connect(error => {

  //If there is an error connecting to the database,
  //log it out to the console
  if (error) {
    console.error("[ERROR] Connection error: ", error.stack);
  } else {
    console.log("\n[DB] Connected...\n");
  }
});

module.exports = db;
