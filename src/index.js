const app = require('./server.js')
const db = require("../db");
const port = 3030;

app.listen(port, () => {
  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
