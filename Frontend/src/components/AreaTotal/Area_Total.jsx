import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaCountChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      legend: {
        show: false
      },
      chart: {
        type: 'treemap',
        height: 350,
        width: '60%'
      },
      title: {
        text: 'Total distribution of Areas in Los Angeles',
        align: 'center',
        style: {
          fontSize: '24px', // Ajusta el tamaño de la fuente del título
          color: '#ffffff' // Cambia el color del título a blanco
        }
      },
      colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    }
  });

  useEffect(() => {
    fetch('http://localhost:5000/get_area_count_total')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const areaNames = data.map(item => item.AREA_NAME);
        const counts = data.map(item => item.NumeroDeRegistros);

        setChartData(prevState => ({
          ...prevState,
          series: [{
            data: areaNames.map((name, index) => ({
              x: name,
              y: counts[index]
            }))
          }]
        }));
      })
      .catch(error => {
        console.error('Error fetching area count data:', error);
      });
  }, []);

  return (
    <div className="area-count-chart" style={{ width: '70%' }}>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="treemap"
        height={350}
      />
    </div>
  );
};

export default AreaCountChart;
