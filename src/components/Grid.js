import React from 'react';

const GridLine = row => {
  const { width, rowHeight, i, headerHeight } = row;

  return (
    <line
      className="grid-line"
      x1={0}
      x2={width}
      y1={rowHeight * (i + 1) + headerHeight}
      y2={rowHeight * (i + 1) + headerHeight}
      width={width}
      stroke="black"
    />
  );
};

export const Grid = props => {
  const { rows } = props;

  return (
    <g>
      {rows && rows.map((r, i) => <GridLine key={r.id} {...props} i={i} />)}
    </g>
  );
};
