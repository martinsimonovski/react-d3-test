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

const GridRow = row => {
  const { width, rowHeight, i, headerHeight } = row;

  const marginTopAndBottom = 4;
  const barPadding = 4;
  let barHeight = (rowHeight - marginTopAndBottom * 2) / row.projects.length;
  barHeight -= barPadding;
  barHeight = barHeight > 10 ? 10 : barHeight;

  return (
    <g>
      {row.projects &&
        row.projects.map((p, index) => {
          const parentY = rowHeight * i + headerHeight + marginTopAndBottom;
          const barY = parentY + (barPadding * index + barHeight * index);

          return (
            <rect
              key={`${i}${index}`}
              x={0}
              y={barY}
              width={width}
              height={barHeight}
              fill={'#A0F0FA'}
            />
          );
        })}
    </g>
  );
};

export const Grid = props => {
  const { rows } = props;

  return (
    <g>
      <g>
        {rows && rows.map((r, i) => <GridLine key={r.id} {...props} i={i} />)}
      </g>
      <g>
        {rows &&
          rows.map((r, i) => <GridRow key={r.id} {...props} {...r} i={i} />)}
      </g>
    </g>
  );
};
