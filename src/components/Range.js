import React, { useContext } from "react";
import { D3Context } from "../context";
import { helpers } from "../utils";

const RangeBackground = props => {
  const { width, height } = props;

  return (
    <rect
      x="0"
      y="0"
      className="ranges"
      width={width}
      height={height}
      fill="grey"
    />
  );
};

const RangeBlock = range => {
  const d3Ctx = useContext(D3Context);

  const blockWidth = helpers.useWidth(range);
  const start = new Date(range.startDate);

  return (
    <rect
      className="block"
      x={d3Ctx.x(start)}
      height={30}
      width={blockWidth}
      y={0}
    />
  );
};

const RangeText = range => {
  const d3Ctx = useContext(D3Context);

  const blockWidth = helpers.useWidth(range);
  const start = new Date(range.startDate);

  return (
    <text
      className="title"
      x={d3Ctx.x(start) + 10}
      height={30}
      width={blockWidth}
      y={30 - 10}
    >
      {range.name}
    </text>
  );
};

export const Range = props => {
  const { ranges } = props;

  return (
    <g transform="translate(0,0)">
      <RangeBackground {...props} />

      <g>
        {ranges &&
          ranges.map(range => <RangeBlock key={range.startDate} {...range} />)}
      </g>
      <g>
        {ranges &&
          ranges.map(range => <RangeText key={range.startDate} {...range} />)}
      </g>
    </g>
  );
};
