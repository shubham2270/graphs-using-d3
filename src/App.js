import React from "react";

import LineGraph from "./lineGraph";
import BarGraph from "./BarGraph";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <LineGraph />
      <BarGraph />
    </div>
  );
}
