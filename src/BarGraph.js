import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";

import "./styles.css";

export default function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    // Selects the svg from dom
    const svg = select(svgRef.current);

    // Scales graph horizontly
    const xScale = scaleLinear()
      .domain([0, data.length - 1]) // counts of data
      .range([0, 800]); // canvas with from 0 to max width

    // Scales graph vertically
    const yScale = scaleLinear()
      .domain([0, 100]) // min to max height of graph (highest value)
      .range([500, 0]); // height of svg

    const xAxis = axisBottom(xScale) // shows downward ticks
      .ticks(data.length) // show tick based on lenght of data
      .tickFormat((index) => index + 1);

    const yAxis = axisRight(yScale); // shows ticks on rightside

    // selects x-axis class & shows ticks on bottom of svg
    svg.select(".x-axis").style("transform", "translateY(500px)").call(xAxis);

    // selects y-axis class & shows ticks with line on right of svg
    svg.select(".y-axis").style("transform", "translateX(800px)").call(yAxis);
  }, [data]);

  return (
    <div className="App">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br /> <br /> <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
      <button
        onClick={() => setData([...data, Math.floor(Math.random() * 90 + 10)])}
      >
        Addd random number
      </button>
    </div>
  );
}
