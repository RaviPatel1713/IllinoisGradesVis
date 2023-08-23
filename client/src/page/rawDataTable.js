import React from 'react';

import './rawDataTable.css';

function App({
  data = []
}) {
  let rows = [];
  rows.push(<tr  className='raw-data-table-row'>
    <th>#</th>
    <th>Time</th>
    <th>Instructor</th>
    <th>Students</th>
    <th>A+/A/A-</th>
    <th>B+/B/B-</th>
    <th>C+/C/C-</th>
    <th>D+/D/D-</th>
    <th>F/W</th>
    <th>Avg. GPA</th>
  </tr>);
  for (let i = 0; i < data.length; i++) {
    rows.push(<tr className='raw-data-table-row'>
      <th><p>{i + 1}</p></th>
      <th><p>{data[i].year + " " + data[i].term}</p></th>
      <th><p>{data[i].instructor}</p></th>
      <th><p>{data[i].students}</p></th>
      <th><p>{data[i].numAp + "/" + data[i].numA + "/" + data[i].numAm}</p></th>
      <th><p>{data[i].numBp + "/" + data[i].numB + "/" + data[i].numBm}</p></th>
      <th><p>{data[i].numCp + "/" + data[i].numC + "/" + data[i].numCm}</p></th>
      <th><p>{data[i].numDp + "/" + data[i].numD + "/" + data[i].numDm}</p></th>
      <th><p>{data[i].numF + "/" + data[i].numW}</p></th>
      <th><p>{data[i].avgGPA.toString().substring(0,6)}</p></th>
    </tr>);
  }
  return <table className='raw-data-table'>
    {rows}
  </table>
}

export default App;
