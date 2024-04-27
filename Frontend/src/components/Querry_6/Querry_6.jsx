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
<option value="ANTIQUE FIREARM">ANTIQUE FIREARM</option>
<option value="AXE">AXE</option>
<option value="BLACKJACK">BLACKJACK</option>
<option value="BLUNT INSTRUMENT">BLUNT INSTRUMENT</option>
<option value="BOARD">BOARD</option>
<option value="BOMB THREAT">BOMB THREAT</option>
<option value="BOTTLE">BOTTLE</option>
<option value="BOW AND ARROW">BOW AND ARROW</option>
<option value="BOWIE KNIFE">BOWIE KNIFE</option>
<option value="BRASS KNUCKLES">BRASS KNUCKLES</option>
<option value="CLEAVER">CLEAVER</option>
<option value="DEMAND NOTE">DEMAND NOTE</option>
<option value="EXPLOXIVE DEVICE">EXPLOXIVE DEVICE</option>
<option value="FIRE">FIRE</option>
<option value="FIXED OBJECT">FIXED OBJECT</option>
<option value="FOLDING KNIFE">FOLDING KNIFE</option>
<option value="GLASS">GLASS</option>
<option value="HAMMER">HAMMER</option>
<option value="HAND GUN">HAND GUN</option>
<option value="HECKLER & KOCH 91 SEMIAUTOMATIC ASSAULT RIFLE">HECKLER & KOCH 91 SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE">HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="ICE PICK">ICE PICK</option>
<option value="KITCHEN KNIFE">KITCHEN KNIFE</option>
<option value="KNIFE WITH BLADE 6INCHES OR LESS">KNIFE WITH BLADE 6INCHES OR LESS</option>
<option value="KNIFE WITH BLADE OVER 6 INCHES IN LENGTH">KNIFE WITH BLADE OVER 6 INCHES IN LENGTH</option>
<option value="M1-1 SEMIAUTOMATIC ASSAULT RIFLE">M1-1 SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="M-14 SEMIAUTOMATIC ASSAULT RIFLE">M-14 SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="MAC-10 SEMIAUTOMATIC ASSAULT WEAPON">MAC-10 SEMIAUTOMATIC ASSAULT WEAPON</option>
<option value="MAC-11 SEMIAUTOMATIC ASSAULT WEAPON">MAC-11 SEMIAUTOMATIC ASSAULT WEAPON</option>
<option value="MACHETE">MACHETE</option>
<option value="MARTIAL ARTS WEAPONS">MARTIAL ARTS WEAPONS</option>
<option value="OTHER CUTTING INSTRUMENT">OTHER CUTTING INSTRUMENT</option>
<option value="OTHER FIREARM">OTHER FIREARM</option>
<option value="OTHER KNIFE">OTHER KNIFE</option>
<option value="PHYSICAL PRESENCE">PHYSICAL PRESENCE</option>
<option value="RAZOR">RAZOR</option>
<option value="RAZOR BLADE">RAZOR BLADE</option>
<option value="RELIC FIREARM">RELIC FIREARM</option>
<option value="REVOLVER">REVOLVER</option>
<option value="RIFLE">RIFLE</option>
<option value="SCALDING LIQUID">SCALDING LIQUID</option>
<option value="SCISSORS">SCISSORS</option>
<option value="SCREWDRIVER">SCREWDRIVER</option>
<option value="SEMI-AUTOMATIC PISTOL">SEMI-AUTOMATIC PISTOL</option>
<option value="SEMI-AUTOMATIC RIFLE">SEMI-AUTOMATIC RIFLE</option>
<option value="SHOTGUN">SHOTGUN</option>
<option value="SIMULATED GUN">SIMULATED GUN</option>
<option value="STICK">STICK</option>
<option value="STRAIGHT RAZOR">STRAIGHT RAZOR</option>
<option value="STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)">STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)</option>
<option value="STUN GUN">STUN GUN</option>
<option value="SWITCH BLADE">SWITCH BLADE</option>
<option value="SWORD">SWORD</option>
<option value="SYRINGE">SYRINGE</option>
<option value="TIRE IRON">TIRE IRON</option>
<option value="TOY GUN">TOY GUN</option>
<option value="UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE">UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="UNKNOWN FIREARM">UNKNOWN FIREARM</option>
<option value="UNKNOWN TYPE CUTTING INSTRUMENT">UNKNOWN TYPE CUTTING INSTRUMENT</option>
<option value="UNKNOWN WEAPON/OTHER WEAPON">UNKNOWN WEAPON/OTHER WEAPON</option>
<option value="UZI SEMIAUTOMATIC ASSAULT RIFLE">UZI SEMIAUTOMATIC ASSAULT RIFLE</option>
<option value="VEHICLE">VEHICLE</option>
<option value="VERBAL THREAT">VERBAL THREAT</option>

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
