var connection = require("./connection.js");

function objToSql(obj) {
    var arr = [];
    for (var key in obj) {
        var value = obj[key];
        console.log(value);
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    console.log(arr);
    return arr.toString();
}

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }


var orm = {
    selectAll: function(table, callback){
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [table], function(err, result){
            if (err) throw err;
            callback(result);
        });
    },

    //Columns and values should be comma separated
    insertOne: function(table, cols, vals, callback){
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            callback(result);
        });
    },

    updateOne: function(table, vals, condition, callback){
        var queryString = `UPDATE ${table} SET ${objToSql(vals)} WHERE ${condition}`;
        console.log("QueryString: ", queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        }); 
    }
};


module.exports = orm;