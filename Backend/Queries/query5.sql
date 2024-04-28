SELECT 
    Vict_Descent,
    COUNT(*) AS Cantidad
FROM 
    Crime_Data
WHERE 
    Vict_Descent IS NOT NULL
    AND AREA_NAME = 'Central'
GROUP BY 
    Vict_Descent
ORDER BY 
    Cantidad DESC;
