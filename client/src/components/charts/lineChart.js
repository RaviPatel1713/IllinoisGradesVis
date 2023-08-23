import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';

import './chart.css';

function App({
  data = [{
    "Time": "2020",
    "GPA": 3.8
  }, {
    "Time": "2021",
    "GPA": 4.0
  }],
  lineColor = '#4da6ff',
  title = 'Line Chart',
  rawData
}) {
  if (rawData != null) {
    data = gpaOverTime(rawData);
  }

  let minY = 4.0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].GPA < minY) minY = data[i].GPA 
  }

  const config = {
    data,
    color: lineColor,
    autoFit: false,
    width: 400,
    height: 200,
    xField: 'Time',
    yField: 'GPA',
    xAxis: {
      tickCount: data.length,
      title: {
        text: "Time",
        style: {
          fill: 'white',
          fontSize: 16,
          fontFamily: 'Segoe UI'
        }
      },
      label: {
        style: {
          fill: 'white'
        }
      }
    },
    yAxis: {
      minLimit: minY,
      maxLimit: 4.0,
      label: {
        formatter: (v) => v.substring(0, 4),
        style: {
          fill: 'white'
        }
      },
      title: {
        text: "Average GPA",
        style: {
          fill: 'white',
          fontSize: 16,
          fontFamily: 'Segoe UI'
        }
      }
    },
    annotations: [
      {
        type: 'regionFilter',
        start: {"Time": data[0].Time, "GPA": 4},
        end: {"Time": data[data.length - 1].Time, "GPA": 3.33},
        color: '#77ff4a',
      },
      {
        type: 'regionFilter',
        start: {"Time": data[0].Time, "GPA": 3.33},
        end: {"Time": data[data.length - 1].Time, "GPA": 2.66},
        color: '#ffd24d',
      },
      {
        type: 'regionFilter',
        start: {"Time": data[0].Time, "GPA": 2.66},
        end: {"Time": data[data.length - 1].Time, "GPA": 0},
        color: '#ff4d4d',
      },
    ]
  };
  return (
    <div className="line-chart-container">
      <h4 className='chart-title'>{title}</h4>
      <Line {...config} className="line-chart"/>
    </div>
  );
}

export default App;

function gpaOverTime(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i].year + " " + data[i].term
    if (containsTime(result, year) == -1) {
      result.push({
        "Time": year,
        "GPA": data[i].avgGPA,
        "students": data[i].students
      });
    } else {
      result[containsTime(result, year)].GPA = 
        (data[i].avgGPA * data[i].students 
          + result[containsTime(result, year)].GPA * result[containsTime(result, year)].students) 
          / (data[i].students + result[containsTime(result, year)].students);
      result[containsTime(result, year)].students += data[i].students;
    }
  }
  result.reverse()
  return result;
}

function containsTime(ary, year) {
  let idx = -1;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].Time == year) idx = i;
  }
  return idx;
}