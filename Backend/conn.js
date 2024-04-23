
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
//QUERIE DE EJEMPLO 1
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

// ----------------------------------------------------------------
// function get_crimedata_from_quantity(quantity, callback) {
//     // connect to your database
//     sql.connect(config, function (err) {
//         if (err) {
//             console.log(err);
//             return callback(err);
//         }

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query(`select top ${quantity} * from Crime_Data`, function (err, recordset) {
//             if (err) {
//                 console.log(err);
//                 return callback(err);
//             }

//             // send records as a response
//             callback(null, recordset.recordset);
//         });
//     });
// }
// module.exports = {get_crimedata_from_quantity}


//QUERIE 1
//-------------------------------------------------------------------
// function get_crimedata_from_quantity(quantity, callback) {
//     // connect to your database
//     sql.connect(config, function (err) {
//         if (err) {
//             console.log(err);
//             return callback(err);
//         }

//         // create Request object
//         var request = new sql.Request();
//         const query = `
//             SELECT TOP 100 DR_NO, crm_cd_desc, LAT, LON
//             FROM Crime_Data
//             WHERE LEN(DR_NO) = 9
//             AND LAT IS NOT NULL
//             AND LON IS NOT NULL
//             AND crm_cd_desc IS NOT NULL;
//         `;
//         // query to the database and get the records
//         request.query(query, function (err, recordset) {
//             if (err) {
//                 console.log(err);
//                 return callback(err);
//             }

//             // send records as a response
//             callback(null, recordset.recordset);
//         });
//     });
// }
// module.exports = {get_crimedata_from_quantity}
//------------------------------------------------------------------


//QUERIE 2
function get_crimedata_from_quantity(quantity, callback) {
    // connect to your database
    const pool = new sql.ConnectionPool(config);
    pool.connect().then(pool => {
        // create Request object
        const request = new sql.Request(pool);

        const query = `
            SELECT Vict_Sex,
                DATE_OCC AS Fecha,
                COUNT(*) AS Cantidad,
                (COUNT(*) * 100.0 / 
                    (SELECT COUNT(*) 
                    FROM Crime_Data 
                    WHERE Vict_Sex IN ('F', 'M', 'X')
                    )
                ) AS Porcentaje
            FROM Crime_Data
            WHERE Vict_Sex IN ('F', 'M', 'X')
            GROUP BY Vict_Sex, DATE_OCC
            ORDER BY Cantidad DESC;
        `;

        // query to the database and get the records
        request.query(query, function (err, recordset) {
            if (err) {
                console.log(err);
                return callback(err);
            }

            // send records as a response
            callback(null, recordset.recordset);

            // close the pool
            pool.close();
        });
    }).catch(err => {
        console.log(err);
        return callback(err);
    });
}
module.exports = {get_crimedata_from_quantity}


