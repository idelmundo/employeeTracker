var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "biditems_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM coolstuff", function(err, res) {
        if (err) throw err;
        console.log(res);
        createcsi();
    });

    function createcsi() {
        console.log("instering a new item...\n");
        var query = connection.query(
            "insert into coolstuff items set ?", {
                title: "shoes",
                item_bid: "me",
                item_highest_bid: "test1"
            },
            function(err, res) {
                console.log(res.affectedRows + "im i there\n");
                // updatesong();
            }
        );
        console.log(query.sql);
    }
}