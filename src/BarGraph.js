import React, { useRef, useEffect, useState } from "react";
import {
  select,
  axisBottom,
  scaleLinear,
  axisRight,
  scaleBand,
  transition
} from "d3";

import "./styles.css";
import useResizeObserver from "./hooks/useResizeObserver";

export default function BarGraph({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    // console.log(dimensions);
    // Selects the svg from dom
    const svg = select(svgRef.current);

    if (!dimensions) return;

    // Scales graph horizontly
    const xScale = scaleBand()
      .domain(data.map((value, index) => index)) // counts of data
      .range([0, dimensions.width])
      .padding(0.5); // canvas with from 0 to max width

    // Scales graph vertically
    const yScale = scaleLinear()
      .domain([0, 150]) // min to max height of graph (highest value)
      .range([dimensions.height, 0]); // height of svg

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["red", "orange", "green"])
      .clamp(true);

    const xAxis = axisBottom(xScale) // shows downward ticks
      .ticks(data.length); // show tick based on lenght of data

    const yAxis = axisRight(yScale); // shows ticks on rightside

    // selects x-axis class & shows ticks on bottom of svg
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // selects y-axis class & shows ticks with line on right of svg
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    // Draw rect bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)") // change bars to upside down for animations
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height) // (- height of svg for putting back bars to its position for animations)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (event, value) => {
        const index = svg.selectAll(".bar").nodes().indexOf(event.target);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join("text")
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("y", yScale(value) - 8)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition() // for animating bars, put before height
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <div className="App" ref={wrapperRef}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      {/* <br /> <br /> <br /> */}
    </div>
  );
}
