import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function CrimeVictimsChart() {
  const [selectedDate, setSelectedDate] = useState('');
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/get_victims_by_sex/${selectedDate}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
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
    const ctx = document.getElementById('crimeChart');
    if (ctx) {
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
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Validate selected date
    const minDate = new Date('2020-01-01');
    const maxDate = new Date('2024-04-01');
    const selectedDateObj = new Date(selectedDate);

    if (selectedDateObj >= minDate && selectedDateObj <= maxDate) {
      setSelectedDate(selectedDate);
    } else {
      console.error('Selected date is outside the allowed range');
      // You can display a message to the user indicating that the selected date is outside the allowed range
    }
  };

  return (
    <div>
      <h1>Crime Victims Chart</h1>
      <div>
        <label htmlFor="datePicker">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          min="2020-01-01"
          max="2024-04-01"
        />
      </div>
      <canvas id="crimeChart"></canvas>
    </div>
  );
}

export default CrimeVictimsChart;
