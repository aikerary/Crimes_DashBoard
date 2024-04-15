const con = require("./conn")

const express = require('express');
const app = express();


// app.get('/get_crimes_data/:quantity', function (req, res) {
    
//     var quantity = req.params.quantity
//     var crimedata = con.get_crimedata_from_quantity(quantity)
//     res.send(crimedata)
// });

app.get('/get_crimes_data/:quantity', function (req, res) {
    var quantity = req.params.quantity;
    con.get_crimedata_from_quantity(quantity, function (err, crimedata) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(crimedata);
    });
});


var server = app.listen(5000, function () {
    console.log('Server is running..');
});