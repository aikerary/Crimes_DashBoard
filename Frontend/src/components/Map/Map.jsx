import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const [data, setData] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    // Configurar el mapa inicial de Los Ángeles
    const map = L.map('map').setView([34.0522, -118.2437], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;
  }, []);

  useEffect(() => {
    // Actualizar el mapa cuando se selecciona un área
    if (selectedArea) {
      fetchData(selectedArea);
    }
  }, [selectedArea]);

  const fetchData = async (area) => {
    try {
      const response = await fetch(`http://localhost:5000/get_area_crime_concentration/${area}`);
      const data = await response.json();
      setData(data);

      // Limpiar el mapa anterior
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Agregar los nuevos marcadores al mapa
      data.forEach((item) => {
        L.circleMarker([item.LAT, item.LON], { radius: item.Cantidad }).addTo(mapRef.current);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div>
      <select value={selectedArea} onChange={handleAreaChange}>
        <option value="">Seleccionar área</option>
        <option value="area1">Newton</option>
        <option value="area2">Central</option>
        {/* Agregar más opciones de área según sea necesario */}
      </select>
      <MapContainer id="map" style={{ height: '500px' }} />
    </div>
  );
};

export default Map;