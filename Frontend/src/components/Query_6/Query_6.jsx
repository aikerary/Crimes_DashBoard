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
          'rgba(164, 0, 51, 1)',
          'rgba(54, 162, 235, 0.5)',
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(40, 38, 76, 1)',
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
          <option value="ANTIQUE FIREARM">Antique Firearm</option>
          <option value="AXE">Axe</option>
          <option value="BLACKJACK">Blackjack</option>
          <option value="BLUNT INSTRUMENT">Blunt Instrument</option>
          <option value="BOARD">Board</option>
          <option value="BOMB THREAT">Bomb Threat</option>
          <option value="BOTTLE">Bottle</option>
          <option value="BOW AND ARROW">Bow and Arrow</option>
          <option value="BOWIE KNIFE">Bowie Knife</option>
          <option value="BRASS KNUCKLES">Brass Knuckles</option>
          <option value="CLEAVER">Cleaver</option>
          <option value="DEMAND NOTE">Demand Note</option>
          <option value="EXPLOXIVE DEVICE">Explosive Device</option>
          <option value="FIRE">Fire</option>
          <option value="FIXED OBJECT">Fixed Object</option>
          <option value="FOLDING KNIFE">Folding Knife</option>
          <option value="GLASS">Glass</option>
          <option value="HAMMER">Hammer</option>
          <option value="HAND GUN">Hand Gun</option>
          <option value="HECKLER & KOCH 91 SEMIAUTOMATIC ASSAULT RIFLE">Heckler & Koch 91 Semiautomatic Assault Rifle</option>
          <option value="HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE">Heckler & Koch 93 Semiautomatic Assault Rifle</option>
          <option value="ICE PICK">Ice Pick</option>
          <option value="KITCHEN KNIFE">Kitchen Knife</option>
          <option value="KNIFE WITH BLADE 6INCHES OR LESS">Knife with Blade 6 Inches or Less</option>
          <option value="KNIFE WITH BLADE OVER 6 INCHES IN LENGTH">Knife with Blade Over 6 Inches in Length</option>
          <option value="M1-1 SEMIAUTOMATIC ASSAULT RIFLE">M1-1 Semiautomatic Assault Rifle</option>
          <option value="M-14 SEMIAUTOMATIC ASSAULT RIFLE">M-14 Semiautomatic Assault Rifle</option>
          <option value="MAC-10 SEMIAUTOMATIC ASSAULT WEAPON">MAC-10 Semiautomatic Assault Weapon</option>
          <option value="MAC-11 SEMIAUTOMATIC ASSAULT WEAPON">MAC-11 Semiautomatic Assault Weapon</option>
          <option value="MACHETE">Machete</option>
          <option value="MARTIAL ARTS WEAPONS">Martial Arts Weapons</option>
          <option value="OTHER CUTTING INSTRUMENT">Other Cutting Instrument</option>
          <option value="OTHER FIREARM">Other Firearm</option>
          <option value="OTHER KNIFE">Other Knife</option>
          <option value="PHYSICAL PRESENCE">Physical Presence</option>
          <option value="RAZOR">Razor</option>
          <option value="RAZOR BLADE">Razor Blade</option>
          <option value="RELIC FIREARM">Relic Firearm</option>
          <option value="REVOLVER">Revolver</option>
          <option value="RIFLE">Rifle</option>
          <option value="SCALDING LIQUID">Scalding Liquid</option>
          <option value="SCISSORS">Scissors</option>
          <option value="SCREWDRIVER">Screwdriver</option>
          <option value="SEMI-AUTOMATIC PISTOL">Semi-Automatic Pistol</option>
          <option value="SEMI-AUTOMATIC RIFLE">Semi-Automatic Rifle</option>
          <option value="SHOTGUN">Shotgun</option>
          <option value="SIMULATED GUN">Simulated Gun</option>
          <option value="STICK">Stick</option>
          <option value="STRAIGHT RAZOR">Straight Razor</option>
          <option value="STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)">Strong-Arm (Hands, Fist, Feet or Bodily Force)</option>
          <option value="STUN GUN">Stun Gun</option>
          <option value="SWITCH BLADE">Switch Blade</option>
          <option value="SWORD">Sword</option>
          <option value="SYRINGE">Syringe</option>
          <option value="TIRE IRON">Tire Iron</option>
          <option value="TOY GUN">Toy Gun</option>
          <option value="UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE">Unknown Type Semiautomatic Assault Rifle</option>
          <option value="UNKNOWN FIREARM">Unknown Firearm</option>
          <option value="UNKNOWN TYPE CUTTING INSTRUMENT">Unknown Type Cutting Instrument</option>
          <option value="UNKNOWN WEAPON/OTHER WEAPON">Unknown Weapon/Other Weapon</option>
          <option value="UZI SEMIAUTOMATIC ASSAULT RIFLE">Uzi Semiautomatic Assault Rifle</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="VERBAL THREAT">Verbal Threat</option>

        </select>
      </div>
      <div style={{ width: '300px', height: '400px' }}>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
