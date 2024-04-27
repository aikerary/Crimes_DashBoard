import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const [data, setData] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    if (selectedWeapon) {
      fetchData(selectedWeapon);
    }
  }, [selectedWeapon]);

  const fetchData = async (weaponDesc) => {
    try {
      const response = await fetch(`http://localhost:5000/get_gender_distribution_by_weapon/${weaponDesc}`);
      const data = await response.json();
      setData(data);
      renderPieChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderPieChart = (data) => {
    const labels = data.map(item => item.Vict_Sex);
    const quantities = data.map(item => item.Cantidad);

    const chartData = {
      labels: labels,
      datasets: [{
        data: quantities,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // Add more colors as needed
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const ctx = document.getElementById('pieChart');
    if (chartRef.current) {
      chartRef.current.destroy(); // Destruir el gráfico anterior si existe
    }
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options
    });
  };

  const handleWeaponChange = (event) => {
    setSelectedWeapon(event.target.value);
  };

  return (
    <div>
      <h2>Crime Statistics by Gender</h2>
      <div>
        <label htmlFor="weaponSelect">Select Weapon:</label>
        <select id="weaponSelect" value={selectedWeapon} onChange={handleWeaponChange}>
          <option value="">Select Weapon</option>
          <option value="ANTIQUE FIREARM">ARMA DE FUEGO ANTIGUA</option>
<option value="AXE">HACHA</option>
<option value="BLACKJACK">PORRA</option>
<option value="BLUNT INSTRUMENT">INSTRUMENTO CONTUNDENTE</option>
<option value="BOARD">TABLA</option>
<option value="BOMB THREAT">AMENAZA DE BOMBA</option>
<option value="BOTTLE">BOTELLA</option>
<option value="BOW AND ARROW">ARCO Y FLECHA</option>
<option value="BOWIE KNIFE">CUCHILLO BOWIE</option>
<option value="BRASS KNUCKLES">PUÑOS AMERICANOS</option>
<option value="CLEAVER">CUCHILLO DE CARNICERO</option>
<option value="DEMAND NOTE">NOTA DE DEMANDA</option>
<option value="EXPLOXIVE DEVICE">DISPOSITIVO EXPLOSIVO</option>
<option value="FIRE">FUEGO</option>
<option value="FIXED OBJECT">OBJETO FIJO</option>
<option value="FOLDING KNIFE">CUCHILLO PLEGABLE</option>
<option value="GLASS">VIDRIO</option>
<option value="HAMMER">MARTILLO</option>
<option value="HAND GUN">PISTOLA</option>
<option value="HECKLER & KOCH 91 SEMIAUTOMATIC ASSAULT RIFLE">FUSIL DE ASALTO SEMIAUTOMÁTICO HECKLER & KOCH 91</option>
<option value="HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE">FUSIL DE ASALTO SEMIAUTOMÁTICO HECKLER & KOCH 93</option>
<option value="ICE PICK">PICAHIELO</option>
<option value="KITCHEN KNIFE">CUCHILLO DE COCINA</option>
<option value="KNIFE WITH BLADE 6INCHES OR LESS">CUCHILLO CON HOJA DE 6 PULGADAS O MENOS</option>
<option value="KNIFE WITH BLADE OVER 6 INCHES IN LENGTH">CUCHILLO CON HOJA DE MÁS DE 6 PULGADAS DE LONGITUD</option>
<option value="M1-1 SEMIAUTOMATIC ASSAULT RIFLE">FUSIL DE ASALTO SEMIAUTOMÁTICO M1-1</option>
<option value="M-14 SEMIAUTOMATIC ASSAULT RIFLE">FUSIL DE ASALTO SEMIAUTOMÁTICO M-14</option>
<option value="MAC-10 SEMIAUTOMATIC ASSAULT WEAPON">ARMA DE ASALTO SEMIAUTOMÁTICA MAC-10</option>
<option value="MAC-11 SEMIAUTOMATIC ASSAULT WEAPON">ARMA DE ASALTO SEMIAUTOMÁTICA MAC-11</option>
<option value="MACHETE">MACHETE</option>
<option value="MARTIAL ARTS WEAPONS">ARMAS DE ARTES MARCIALES</option>
<option value="OTHER CUTTING INSTRUMENT">OTRO INSTRUMENTO DE CORTE</option>
<option value="OTHER FIREARM">OTRA ARMA DE FUEGO</option>
<option value="OTHER KNIFE">OTRO CUCHILLO</option>
<option value="PHYSICAL PRESENCE">PRESENCIA FÍSICA</option>
<option value="RAZOR">NAVAJA</option>
<option value="RAZOR BLADE">HOJA DE NAVAJA</option>
<option value="RELIC FIREARM">ARMA DE FUEGO RELIQUIA</option>
<option value="REVOLVER">REVÓLVER</option>
<option value="RIFLE">FUSIL</option>
<option value="SCALDING LIQUID">LÍQUIDO ESCALDANTE</option>
<option value="SCISSORS">TIJERAS</option>
<option value="SCREWDRIVER">DESTORNILLADOR</option>
<option value="SEMI-AUTOMATIC PISTOL">PISTOLA SEMIAUTOMÁTICA</option>
<option value="SEMI-AUTOMATIC RIFLE">FUSIL SEMIAUTOMÁTICO</option>
<option value="SHOTGUN">ESCOPETA</option>
<option value="SIMULATED GUN">ARMA SIMULADA</option>
<option value="STICK">PALO</option>
<option value="STRAIGHT RAZOR">NAVAJA RECTA</option>
<option value="STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)">FUERZA FÍSICA (MANOS, PUÑOS, PIES O FUERZA CORPORAL)</option>
<option value="STUN GUN">PISTOLA ELÉCTRICA</option>
<option value="SWITCH BLADE">NAVAJA AUTOMÁTICA</option>
<option value="SWORD">ESPADA</option>
<option value="SYRINGE">JERINGA</option>
<option value="TIRE IRON">PALANCA DE NEUMÁTICO</option>
<option value="TOY GUN">ARMA DE JUGUETE</option>
<option value="UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE">TIPO DE FUSIL DE ASALTO SEMIAUTOMÁTICO DESCONOCIDO</option>
<option value="UNKNOWN FIREARM">ARMA DE FUEGO DESCONOCIDA</option>
<option value="UNKNOWN TYPE CUTTING INSTRUMENT">TIPO DE INSTRUMENTO DE CORTE DESCONOCIDO</option>
<option value="UNKNOWN WEAPON/OTHER WEAPON">ARMA DESCONOCIDA/OTRA ARMA</option>
<option value="UZI SEMIAUTOMATIC ASSAULT RIFLE">FUSIL DE ASALTO SEMIAUTOMÁTICO UZI</option>
<option value="VEHICLE">VEHÍCULO</option>
<option value="VERBAL THREAT">AMENAZA VERBAL</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div style={{ width: '400px', height: '400px' }}>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
