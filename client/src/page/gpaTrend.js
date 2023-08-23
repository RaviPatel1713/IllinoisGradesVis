import React from 'react';

function App({
  slope = 0
}) {

  let arrow = <h5 style={{color:"gold"}}> &nbsp;&nbsp; <b>―</b> (No Significant Changes)</h5>;
  if (slope >= 0.125) arrow = <h5 style={{color:"green"}}> &nbsp;&nbsp; 🡹🡹 (Significantly Increasing)</h5>;
  else if (slope >= 0.05) arrow = <h5 style={{color:"green"}}> &nbsp;&nbsp; 🡹 (Moderately Increasing)</h5>;
  else if (slope < -0.125) arrow = <h5 style={{color:"red"}}> &nbsp;&nbsp; 🡻🡻 (Significantly Decreasing)</h5>;
  else if (slope <= -0.05) arrow = <h5 style={{color:"red"}}> &nbsp;&nbsp; 🡻 (Moderately Decreasing)</h5>;
  

  return <div id="gpa-trend-container">
    <h5>GPA Trend: m = {slope.toPrecision(3)}</h5>
    {arrow}
  </div>;
}

export default App;
