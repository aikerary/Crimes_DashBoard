
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

// Funciones para ejecutar consultas
function get_crime_location_by_type(crm_cd_desc, callback) {
    const queryString = `
        SELECT TOP 1000 LON, LAT
        FROM Crime_Data
        WHERE crm_cd_desc = @crm_cd_desc
          AND LAT IS NOT NULL
          AND LON IS NOT NULL;
    `;

    executeQuery(queryString, { crm_cd_desc }, callback);
}
//ejemplo de puerto: http://localhost:5000/get_crime_location/THEFT,%20PERSON

//--------------------------------------------
function get_victims_by_sex(date, callback) {
    const queryString = `
    SELECT Vict_Sex, COUNT(*) AS Cantidad
    FROM Crime_Data
    WHERE DATE_OCC = CONVERT(datetime, @date, 120) -- 120 es el formato para 'YYYY-MM-DD HH:MI:SS'
      AND Vict_Sex IN ('F', 'M', 'X')
    GROUP BY Vict_Sex;
    
    `;

    executeQuery(queryString, { date }, callback);
}
// //ejemplo de puerto: http://localhost:5000/get_victims_by_sex/2021-04-25

function get_crime_count_and_hours_by_type(crm_cd_desc, callback) {
    const queryString = `
    SELECT Crm_Cd_Desc, COUNT(Crm_Cd_Desc) AS NumeroDeCrimenes, DATEPART(HOUR, TIME_OCC) AS Hour
    FROM Crime_Data
WHERE DATEPART(MINUTE, TIME_OCC) = 0 and Crm_Cd_Desc = @crm_cd_desc
GROUP BY DATEPART(HOUR, TIME_OCC), Crm_Cd_Desc,TIME_OCC
    ORDER BY TIME_OCC ASC;
    `;
    executeQuery(queryString, { crm_cd_desc }, callback);
}
//// EJEMPLO DE CONEXION: http://localhost:5000/get_crime_count_and_hours/VEHICLE%20-%20STOLEN

function get_area_crime_concentration(areaName, callback) {
    const queryString = `
        SELECT TOP 1000 AREA_NAME, LAT, LON, COUNT(*) AS Cantidad
        FROM Crime_Data
        WHERE AREA_NAME = @areaName
        GROUP BY AREA_NAME, LAT, LON;
    `;

    executeQuery(queryString, { areaName }, callback);
}

////// EJEMPLO DE CONEXION: http://localhost:5000/get_area_crime_concentration/Newton

function get_victims_by_descent_and_area(areaName, callback) {
    const queryString = `
        SELECT 
            Vict_Descent,
            COUNT(*) AS Cantidad
        FROM 
            Crime_Data
        WHERE 
            Vict_Descent IS NOT NULL
            AND AREA_NAME = @areaName
        GROUP BY 
            Vict_Descent
        ORDER BY 
            Cantidad DESC;
    `;

    executeQuery(queryString, { areaName }, callback);
}

/////////////////EJEMPLO DE CONEXION: http://localhost:5000/get_victims_by_descent_and_area/Newton

function get_gender_distribution_by_weapon(weapon_desc, callback) {
    const queryString = `
        SELECT Weapon_Desc, Vict_Sex, COUNT(*) AS Cantidad
        FROM Crime_Data
        WHERE Weapon_Desc = @weapon_desc
          AND Vict_Sex IS NOT NULL
          AND Vict_Sex != 'X'
          AND Vict_Sex != 'H'
        GROUP BY Weapon_Desc, Vict_Sex;
    `;

    executeQuery(queryString, { weapon_desc }, callback);
}

///////////////////EJEMPLO DE CONEXION: http://localhost:5000/get_gender_distribution_by_weapon/SHOTGUN

function executeQuery(queryString, params, callback) {
    const pool = new sql.ConnectionPool(config); // Crea una nueva  conexion
    pool.connect().then(pool => {
        const request = new sql.Request(pool); // Crea una nueva solicitud

        // Agrega parámetros a la solicitud
        for (let key in params) {
            request.input(key, params[key]);
        }

        // Ejecuta la consulta
        request.query(queryString, function (err, recordset) {
            if (err) {
                console.log(err);
                pool.close(); 
                return callback(err);
            }

            callback(null, recordset.recordset);
            pool.close(); 
        });
    }).catch(err => {
        console.log(err);
        return callback(err);
    });
}

module.exports = {
    get_crime_location_by_type,
    get_victims_by_sex,
    get_crime_count_and_hours_by_type,
    get_area_crime_concentration,
    get_victims_by_descent_and_area,
    get_gender_distribution_by_weapon,

};