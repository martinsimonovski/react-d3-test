import React from 'react';
import { Range } from './Range';
import { Grid } from './Grid';
import { Bars } from './Bars';

export const Timeline = props => {
  const { height, width, ranges, rangesHeight, rows, rowHeight } = props;

  return (
    <div style={{ height, width }} className="timeline">
      <svg style={{ height, width }}>
        <Range width={width} height={rangesHeight} ranges={[...ranges]} />
        <Grid
          width={width}
          height={height}
          rows={rows}
          rowHeight={rowHeight}
          headerHeight={rangesHeight}
        />
        <Bars
          width={width}
          height={height}
          rows={rows}
          rowHeight={rowHeight}
          headerHeight={rangesHeight}
        />
      </svg>
    </div>
  );
};
