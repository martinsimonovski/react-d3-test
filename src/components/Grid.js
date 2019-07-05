import React from "react";

const GridLine = row => {
  const { width, y } = row;

  return (
    <line
      className="grid-line"
      x1={0}
      x2={width}
      y1={y}
      y2={y}
      width={width}
      stroke="black"
    />
  );
};

export const Grid = props => {
  const { rows, rowHeight, paddingTop, width } = props;

  return (
    <g>
      {rows &&
        rows.map((r, i) => (
          <GridLine
            key={r.id}
            width={width}
            y={rowHeight * (i + 1) + paddingTop}
          />
        ))}
    </g>
  );
};
