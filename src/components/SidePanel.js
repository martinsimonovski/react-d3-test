import React from "react";

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

export const SidePanel = props => {
  const { height, width, headerHeight } = props;
  console.log({ props });
  return (
    <div style={{ height, width }} className="side-panel">
      <svg style={{ height, width }}>
        <SidePanelHeader width={width} height={headerHeight} />
      </svg>
    </div>
  );
};
