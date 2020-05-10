
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "mysql://bd0d580252c652:f8fdad72@us-cdbr-east-06.cleardb.net/heroku_c3fff59474658c1?reconnect=true",
  port: 3306,
  user: "bd0d580252c652",
  password: "f8fdad72",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;