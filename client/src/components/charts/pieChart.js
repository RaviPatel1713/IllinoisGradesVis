import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

import './chart.css';

function App({
  data = [{
    type: 'As',
    value: 0
  },
  {
    type: 'Bs',
    value: 0
  }],
  color = ['#4da6ff', '#77ff4a','#ffd24d', '#ff4d4d', '#a64dff'],
  title = 'Pie Chart',
  rawData
}) {

  if (rawData != null) {
    data = totalStudents(rawData);
  }

  const config = {
    appendPadding: 10,
    data,
    autoFit: false,
    width: 400,
    height: 200,
    angleField: 'value',
    colorField: 'type',
    color: color,
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
      autoRotate: false,
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
    legend: {
      itemName: {
        style: {
          fill: "#ffffff"
        },
      },
      marker: {
        symbol: "circle"
      }
    }
  
  };

  return (
    <div className="pie-chart-container">
      <h4 className='chart-title'>{title}</h4>
      <Pie {...config} className="line-chart"/>
    </div>
  );
}

export default App;

function totalStudents(data) {
  let result = [{
    type: 'As',
    value: 0
  },
  {
    type: 'Bs',
    value: 0
  },
  {
    type: 'Cs',
    value: 0
  },
  {
    type: 'Ds',
    value: 0
  },
  {
    type: 'F',
    value: 0
  }];
  for (let i = 0; i < data.length; i++) {
    result[0].value += (data[i].numA + data[i].numAm + data[i].numAp); //A
    result[1].value += (data[i].numB + data[i].numBm + data[i].numBp); //B
    result[2].value += (data[i].numC + data[i].numCm + data[i].numCp); //C
    result[3].value += (data[i].numD + data[i].numDm + data[i].numDp); //D
    result[4].value += (data[i].numF);                                 //F
  }
  return result;
}