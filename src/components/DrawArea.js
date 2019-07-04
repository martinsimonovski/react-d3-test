import React from "react";
import { Range } from "./Range";

export const DrawArea = props => {
  const { height, width, ranges } = props;
  return (
    <div style={{ height: height, width: width }} className="draw-area">
      <svg style={{ height: height, width: width }}>
        <Range width={width} height={30} ranges={[...ranges]} />
      </svg>
    </div>
  );
};
