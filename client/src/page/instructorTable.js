import React from 'react';

function App({
  data = [{
    "Professor": "A. Smith",
    "GPA": 3.5,
    "students": 50
  }, {
    "Professor": "J. Turner",
    "GPA": 3.9,
    "students": 50
  }]
}) {
  let rows = [];
  rows.push(<tr>
    <th>Instructor</th>
    <th>Avg. GPA</th>
    <th># Students</th>
  </tr>);
  for (let i = 0; i < data.length; i++) {
    rows.push(<tr>
      <th><p>{data[i].Professor}</p></th>
      <th><p>{data[i].GPA.toString().substring(0,6)}</p></th>
      <th><p>{data[i].students}</p></th>
    </tr>);
  }
  return <table className='instructor-table'>
    {rows}
  </table>
}

export default App;
