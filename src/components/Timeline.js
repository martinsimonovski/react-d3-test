import React from "react";
import { Range } from "./Range";

export const Timeline = props => {
  const { height, width, ranges, rangesHeight } = props;

  return (
    <div style={{ height, width }} className="timeline">
      <svg style={{ height, width }}>
        <Range width={width} height={rangesHeight} ranges={[...ranges]} />
      </svg>
    </div>
  );
};
