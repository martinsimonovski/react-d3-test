import React, { useRef, useEffect, useState } from 'react';
import { scaleTime, scaleBand, max } from 'd3';
import { boundaries } from '../utils';
import { D3Context } from '../context';
import { Header } from './Header';
import { SidePanel } from './SidePanel';
import { Timeline } from './Timeline';

export const Gantt = props => {
  const { config } = props;
  const ref = useRef();
  const [isSet, setIsSet] = useState(false);
  const [chartWidth, setChartWidth] = useState(500);
  const [chartHeight, setChartHeight] = useState(100);
  const headerHeight = 30;
  const sidePanel = 300;
  const { headerRanges, subHeaderRanges, dateBoundary } = boundaries.get(
    config.metrics
  );

  useEffect(() => {
    setChartWidth(ref.current.offsetWidth);
    const h = max([config.data.length * config.rowHeight + headerHeight]);
    setChartHeight(h);
    setIsSet(true);
  }, [isSet, config.data.length, config.rowHeight]);

  if (!isSet) {
    return (
      <div ref={ref} className="chart">
        {' '}
        Loading...{' '}
      </div>
    );
  }

  const width = max([chartWidth, 500]);
  const height = chartHeight;

  const x = scaleTime()
    .domain(dateBoundary)
    .range([0, width - sidePanel]);
  const y = scaleBand().range([0, height], 0.1);

  return (
    <D3Context.Provider value={{ x, y, dateBoundary, config }}>
      <div ref={ref} className="chart" width="100%">
        <Header
          height={headerHeight}
          width={width}
          range={headerRanges}
          paddingLeft={sidePanel}
        />
        <SidePanel
          height={height}
          width={sidePanel}
          headerHeight={headerHeight}
          rows={config.data}
          rowHeight={config.rowHeight}
        />
        <Timeline
          height={height}
          width={width - sidePanel}
          paddingLeft={sidePanel}
          ranges={subHeaderRanges}
          rangesHeight={headerHeight}
          rows={config.data}
          rowHeight={config.rowHeight}
        />
      </div>
    </D3Context.Provider>
  );
};
