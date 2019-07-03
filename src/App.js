import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { boundaries } from './utils';
import { D3Context } from './context';
import './App.css';

// components
import { Header } from './Header';

const config = {
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  container: '#chart',
  box_padding: 10,
  metrics: {
    type: 'overall', // [overall, yearly, quarterly-[months,weeks], monthly-[months,weeks]]
    startDate: '2019-04-01 10:11:12.123456',
    endDate: null,
    subType: 'weeks'
  },
  showChildColor: false,
  headerAdd: () => {
    alert('Yeyy!!!');
  }
};

function App() {
  const ref = useRef();
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
  }, []);

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
}

export default App;
