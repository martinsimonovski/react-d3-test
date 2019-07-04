import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { boundaries } from "../utils";
import { D3Context } from "../context";
import { Header } from "./Header";
import { SidePanel } from "./SidePanel";
import { Timeline } from "./Timeline";

const getRows = (data, barHeight, headerHeight) => {
  let height = 0 - barHeight;

  const rows = data.map(one => {
    const row = {
      ...one,
      y: height + barHeight + headerHeight,
      height: one.projects.length * barHeight
    };
    height += one.projects.length * barHeight;
    return row;
  });

  return {
    rows,
    height
  };
};

export const Gantt = props => {
  const { config } = props;
  const ref = useRef();
  const [isSet, setIsSet] = useState(false);
  const [chartWidth, setChartWidth] = useState(500);
  const [chartHeight, setChartHeight] = useState(100);
  const rowHeight = 20;
  const headerHeight = 30;
  const sidePanel = 300;
  const { headerRanges, subHeaderRanges, dateBoundary } = boundaries.get(
    config.metrics
  );

  const { rows, height: rowsHeight } = getRows(
    config.data,
    config.barHeight,
    headerHeight
  );

  useEffect(() => {
    setChartWidth(ref.current.offsetWidth);
    const h = d3.max([rowsHeight + headerHeight * 2]);
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
    .range([0, width - sidePanel]);
  const y = d3.scaleBand().range([0, height], 0.1);

  return (
    <D3Context.Provider value={{ x, y, dateBoundary }}>
      <div ref={ref} className="chart" width="100%">
        <Header
          height={headerHeight}
          width={width}
          range={headerRanges[0]}
          paddingLeft={sidePanel}
        />
        <SidePanel
          height={height}
          width={sidePanel}
          headerHeight={headerHeight}
          rows={rows}
        />
        <Timeline
          height={height}
          width={width - sidePanel}
          paddingLeft={sidePanel}
          ranges={subHeaderRanges}
          rangesHeight={headerHeight}
        />
      </div>
    </D3Context.Provider>
  );
};
