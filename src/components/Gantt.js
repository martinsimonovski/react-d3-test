import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { boundaries } from "../utils";
import { D3Context } from "../context";
import { Header } from "./Header";

export const Gantt = props => {
  const { config } = props;
  const ref = useRef();
  const [isSet, setIsSet] = useState(false);
  const [chartWidth, setChartWidth] = useState(500);
  const [chartHeight, setChartHeight] = useState(100);
  const rowHeight = 20;
  const headerHeight = 30;
  const leftColumn = 300;
  const { headerRanges, dateBoundary } = boundaries.get(config.metrics);

  useEffect(() => {
    setChartWidth(ref.current.offsetWidth);
    const h = d3.max([config.data.length * rowHeight]);
    setChartHeight(h);
    setIsSet(true);
  }, [isSet, config.data.length]);

  if (!isSet) {
    return (
      <div ref={ref} className="chart">
        {" "}
        Loading...{" "}
      </div>
    );
  }

  const width = d3.max([chartWidth, 500]);
  const height = chartHeight;

  const x = d3
    .scaleTime()
    .domain(dateBoundary)
    .range([0, width - leftColumn]);
  const y = d3.scaleBand().range([0, height], 0.1);

  return (
    <D3Context.Provider value={{ x, y, dateBoundary }}>
      <div ref={ref} className="chart" width="100%">
        <Header height={headerHeight} width={width} range={headerRanges[0]} />
      </div>
    </D3Context.Provider>
  );
};
