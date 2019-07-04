import React, { Fragment } from 'react';

const SidePanelHeader = props => {
  const { width, height } = props;

  return (
    <g>
      <rect
        className="side-panel-header"
        x={0}
        y={0}
        width={width}
        height={height}
      />
      <text
        className="title"
        x={10}
        y={height / 2 + 5}
        width={width}
        height={height - 10}
      >
        Resources
      </text>
    </g>
  );
};

const SidePanelRow = row => {
  const { width, rowHeight, i, headerHeight } = row;

  return (
    <Fragment>
      <rect
        className="row"
        x={0}
        y={rowHeight * i + headerHeight}
        width={width}
        height={rowHeight}
      />
      <text
        className="label"
        x={10}
        y={rowHeight * i + headerHeight + rowHeight / 2 + 5}
        width={width}
        height={rowHeight}
      >
        {row.firstName + ` ` + row.lastName}
      </text>
    </Fragment>
  );
};

export const SidePanel = props => {
  const { height, width, headerHeight, rows } = props;

  return (
    <div style={{ height, width }} className="side-panel">
      <svg style={{ height, width }}>
        <SidePanelHeader width={width} height={headerHeight} />
        <g>
          {rows &&
            rows.map((row, i) => (
              <SidePanelRow key={row.id} {...props} {...row} i={i} />
            ))}
        </g>
      </svg>
    </div>
  );
};
