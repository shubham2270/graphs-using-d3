import React, { useState } from "react";

import LineGraph from "./lineGraph";
import BarGraph from "./BarGraph";

import "./styles.css";

export default function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  return (
    <div className="App">
      {/* <LineGraph /> */}
      <BarGraph data={data} />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
      <button
        onClick={() => setData([...data, Math.floor(Math.random() * 130 + 20)])}
      >
        Addd random number
      </button>
    </div>
  );
}
