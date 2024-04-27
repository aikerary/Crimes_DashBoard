import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function CrimeVictimsChart() {
  const [selectedDate, setSelectedDate] = useState('');
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/get_victims_by_sex/${selectedDate}`)
        .then(response => response.json())
        .then(data => setVictimData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (victimData.length > 0) {
      renderChart();
    }
  }, [victimData]);

  const renderChart = () => {
    const ctx = document.getElementById('crimeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: victimData.map(item => item.Vict_Sex),
        datasets: [{
          label: 'Crime Victims by Sex',
          data: victimData.map(item => item.Cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
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
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h1>QUERY 2</h1>
      <div>
        <label htmlFor="datePicker">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <canvas id="crimeChart"></canvas>
    </div>
  );
}

export default CrimeVictimsChart;
