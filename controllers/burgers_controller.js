var express = require('express');
var burger = require('../models/burger.js');
var router = express.Router();

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post('/api/burgers', function(req, res){
    var { burger_name , devoured } = req.body;
    burger.insertOne(["burger_name", "devoured"], [burger_name, devoured], function(result){
        res.json({ id: result.insertId });
    });
});

router.post('/api/burgers/:id', function(req, res){
    var condition = `id=${req.params.id}`;

    burger.updateOne({
        devoured: req.body.devoured
    },
    condition,
    function(result){
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;