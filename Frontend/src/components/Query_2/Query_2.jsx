import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function CrimeVictimsChart() {
  const [selectedDate, setSelectedDate] = useState('');
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  const fetchData = async (selectedDate) => {
    try {
      const response = await fetch(`http://localhost:5000/get_victims_by_sex/${selectedDate}`);
      const data = await response.json();
      setVictimData(data);
      renderChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const renderChart = (data) => {
    const ctx = document.getElementById('crimeVictimsChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Female', 'Male', 'Other'],
        datasets: [{
          label: 'Crime Victims by Sex',
          data: [
            data.find(victim => victim.Vict_Sex === 'F').Cantidad,
            data.find(victim => victim.Vict_Sex === 'M').Cantidad,
            data.find(victim => victim.Vict_Sex === 'X').Cantidad
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  }

  return (
    <div>
      <h1>Crime Victims Information</h1>
      <div>
        <label htmlFor="datePicker">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          min="2020-01-01"
          max="2024-04-01"
          onChange={handleDateChange}
        />
      </div>
      <div>
        <canvas id="crimeVictimsChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default CrimeVictimsChart;
