SELECT Crm_Cd_Desc, count(Crm_Cd_Desc) as NumeroDeCrimenes ,TIME_OCC 
FROM Crime_Data_from_2020_to_Present_20240423
WHERE Crm_Cd_Desc = 'VEHICLE - STOLEN'
GROUP BY Crm_Cd_Desc, TIME_OCC
ORDER BY TIME_OCC ASC