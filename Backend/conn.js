
const sql = require("mssql");

// config for your database
var config = {
    user: 'crimes',
    password: 'password',
    server: 'localhost',
    port: 1434,
    database: 'Crimes LA',
    options: { trustServerCertificate: true }
};

// function get_crimedata_from_quantity(quantity) {
//     var result = []
//     // connect to your database
//     sql.connect(config, function (err) {

//         if (err) {
//              console.log(err);
//         }

//         // create Requecd st object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query(`select top ${quantity} * from Crime_Data`, function (err, recordset) {

//             if (err) { console.log(err)}

//             // send records as a response
//             result = recordset.recordset
//             // console.log(result)
//         });
        
//     });
//     // return result 
// }


function get_crimedata_from_quantity(quantity, callback) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            return callback(err);
        }

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`select top ${quantity} * from Crime_Data`, function (err, recordset) {
            if (err) {
                console.log(err);
                return callback(err);
            }

            // send records as a response
            callback(null, recordset.recordset);
        });
    });
}
module.exports = {get_crimedata_from_quantity}


