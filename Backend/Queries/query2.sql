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
