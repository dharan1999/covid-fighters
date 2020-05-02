import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';
// import { withTheme } from '@material-ui/core';


const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {fontColor:"white", display: true, text: `Current state in ${country}` },
          scales: {
            xAxes: [{ display: true, ticks: { fontColor: "white", fontSize: 14 },gridLines: { color: "#fff",lineWidth:3 }}],
            yAxes: [{display: true, ticks: { fontColor: "white",fontSize: 14},gridLines: { color: "#fff",lineWidth:3 }}],
            scaleLabel: {
              display: true,
              // labelString: 'Y axe name',
              fontColor: '#000000',
              fontSize:15
          },
            }
  }
        }
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={
          {
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            // borderColor: '#fff',
            fill: true,
            
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
            color: '#fff',
          },
          ],
         
        }
      
      }
      options={{
        legend: { display: false },
        title: {fontColor:"white", display: true, text: `Current state in ${country}` },
        scales: {
          xAxes: [{ display: true, ticks: { fontColor: "white", fontSize: 14 },gridLines: { lineWidth:3, zeroLineColor: "white",zeroLineWidth:5}}],
          yAxes: [{ display: true, ticks: { fontColor: "white",fontSize: 14},gridLines: {  lineWidth:3, color:"#fff",zeroLineWidth:7,zeroLineColor:"white"}}],
          scaleLabel: {
            display: true,
            // labelString: 'Y axe name',
            fontColor: '#000000',
            fontSize: 8,
        },
          }
}
      }

      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;