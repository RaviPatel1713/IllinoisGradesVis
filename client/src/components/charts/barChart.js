import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

import './chart.css';

function App({
  data = [{
    "prof": "A. Smith",
    "type": "As",
    "value": 50
  }, {
    "prof": "A. Smith",
    "type": "Bs",
    "value": 30
  },{
    "prof": "A. Smith",
    "type": "Cs",
    "value": 10
  }],
  color = ['#4da6ff', '#77ff4a','#ffd24d', '#ff4d4d', '#a64dff'],
  title = 'Bar Chart',
  rawData
}) {

  if (rawData != null) {
    data = processGPA(rawData);
  }

  const config = {
    data,
    color: color,
    autoFit: false,
    width: 400,
    height: 250,
    isPercent: true,
    isStack: true,
    yField: 'prof',
    xField: 'value',
    yAxis: {
      label: {
        style: {
          fill: 'white'
        }
      },
      title: {
        text: "Instructor Name",
        style: {
          fill: 'white',
          fontSize: 16,
          fontFamily: 'Segoe UI'
        }
      }
    },
    xAxis: {
      label: {
        formatter: (v) => (v * 100).toString() + "%",
        style: {
          fill: 'white'
        }
      },
      title: {
        text: "Percentage",
        style: {
          fill: 'white',
          fontSize: 16,
          fontFamily: 'Segoe UI'
        }
      }
    },
    seriesField: 'type',
    label: false,
    legend: {
      itemName: {
        style: {
          fill: "#ffffff"
        },
      },
      marker: {
        symbol: "circle"
      },
      layout: 'horizontal',
      position: 'top'
    }
  
  };

  return (
    <div className="pie-chart-container">
      <h4 className='chart-title'>{title}</h4>
      <Bar {...config} className="line-chart"/>
    </div>
  );
}

export default App;

function processGPA(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const iProf = data[i].instructor;
    if (containsProf(result, iProf, "As") == -1) {
      result.push({
        "prof": iProf,
        "type": "As",
        "value": data[i].numA + data[i].numAm + data[i].numAp
      });
      result.push({
        "prof": iProf,
        "type": "Bs",
        "value": data[i].numB + data[i].numBm + data[i].numBp
      });
      result.push({
        "prof": iProf,
        "type": "Cs",
        "value": data[i].numC + data[i].numCm + data[i].numCp
      });
      result.push({
        "prof": iProf,
        "type": "Ds",
        "value": data[i].numD + data[i].numDm + data[i].numDp
      });
      result.push({
        "prof": iProf,
        "type": "F",
        "value": data[i].numF
      });
    } else {
      result[containsProf(result, iProf, "As")].value += (data[i].numA + data[i].numAm + data[i].numAp);
      result[containsProf(result, iProf, "Bs")].value += (data[i].numB + data[i].numBm + data[i].numBp);
      result[containsProf(result, iProf, "Cs")].value += (data[i].numC + data[i].numCm + data[i].numCp);
      result[containsProf(result, iProf, "Ds")].value += (data[i].numD + data[i].numDm + data[i].numDp);
      result[containsProf(result, iProf, "F")].value += (data[i].numF);
    }
  }
  return result;
}

function containsProf(ary, prof, letter) {
  let idx = -1;
  for (let i = 0; i < ary.length; i++) if (ary[i].prof == prof && ary[i].type == letter) idx = i;
  return idx;
}