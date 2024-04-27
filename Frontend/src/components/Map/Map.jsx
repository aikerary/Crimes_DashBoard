
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CrimeMap = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [areasData, setAreasData] = useState([]);

  useEffect(() => {
    fetchAreasData();
  }, [selectedArea]);

  const fetchAreasData = async () => {
    try {
      if (!selectedArea) return;

      const response = await fetch(`http://localhost:5000/get_area_crime_concentration/${selectedArea}`);
      const data = await response.json();
      setAreasData(data);
    } catch (error) {
      console.error('Error fetching areas data:', error);
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  return (
    <div>
      <div>
        <select value={selectedArea} onChange={(e) => handleAreaSelect(e.target.value)}>
          <option value="">Seleccionar área</option>
          <option value="Newton">Newton</option>
          <option value="Hollywood">Hollywood</option>
          <option value="Southwest">Southwest</option>
          <option value="Central">Central</option>
          <option value="Pacific">Pacific</option>
          {/* Agregar más opciones según sea necesario */}
        </select>
      </div>
      <div style={{ height: '500px' }}>
        <MapContainer center={[34.0522, -118.2437]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox/streets-v11"
            accessToken="pk.eyJ1IjoibXlzdGljMjMiLCJhIjoiY2x2aG11OTFwMTdvNTJpb3ppdGgyenRnNCJ9.3tmaMtmoEHwZtX_mEztE8Q"
          />
          {areasData.map((area, index) => (
            <Marker key={index} position={[parseFloat(area.LAT), parseFloat(area.LON)]}>
              <Popup>
                <div>
                  <h3>{area.AREA_NAME}</h3>
                  <p>Cantidad de crímenes: {area.Cantidad}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CrimeMap;
