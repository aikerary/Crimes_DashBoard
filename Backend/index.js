const express = require('express');
const app = express();
const con = require("./conn")

//--------------------------------------------------------------
// app.get('/get_crimes_data/:quantity', function (req, res) {
    
//     var quantity = req.params.quantity
//     var crimedata = con.get_crimedata_from_quantity(quantity)
//     res.send(crimedata)
// });

// app.get('/get_crimes_data/:quantity', function (req, res) {
//     var quantity = req.params.quantity;
//     con.get_crimedata_from_quantity(quantity, function (err, crimedata) {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.send(crimedata);
//     });
// });


// var server = app.listen(5000, function () {
//     console.log('Server is running..');
// });
//---------------------------------------------------------------

// Ruta para obtener la ubicación de crímenes por tipo de delito
app.get('/get_crime_location/:crime_type', function (req, res) {
    const crime_type = req.params.crime_type;
    con.get_crime_location_by_type(crime_type, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// // Ruta para obtener la cantidad de víctimas por sexo en una fecha específica
app.get('/get_victims_by_sex/:date', function (req, res) {
    const date = req.params.date;
    con.get_victims_by_sex(date, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});


// Ruta para obtener la cantidad de crímenes y las horas en que ocurrieron por tipo de delito
app.get('/get_crime_count_and_hours/:crime_type', function (req, res) {
    let crime_type = req.params.crime_type;
    crime_type = decodeURIComponent(crime_type);

    con.get_crime_count_and_hours_by_type(crime_type, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});



// // Ruta para obtener la concentración de crímenes por área
app.get('/get_area_crime_concentration/:areaName', function (req, res) {
    const areaName = req.params.areaName; 

    con.get_area_crime_concentration(areaName, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});


// // Ruta para obtener la cantidad de crímenes por tipo y hora
app.get('/get_crime_count_by_type_and_hour/:crime_type', function (req, res) {
    const crime_type = req.params.crime_type;
    con.get_crime_count_by_type_and_hour(crime_type, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// // Ruta para obtener la distribución de género por arma
app.get('/get_gender_distribution_by_weapon/:weapon_desc', function (req, res) {
    const weapon_desc = req.params.weapon_desc;
    con.get_gender_distribution_by_weapon(weapon_desc, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// Iniciar el servidor
const server = app.listen(5000, function () {
    console.log('Server is running on port 5000');
});
