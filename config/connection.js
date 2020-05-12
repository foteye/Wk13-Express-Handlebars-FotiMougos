var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.connect(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "",
  });
}
connection.connect();
module.exports = connection;