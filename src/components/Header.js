import React, { useContext } from "react";
import { D3Context } from "../context";
import { helpers } from "../utils";

export const Header = props => {
  const { width, height, range } = props;
  const d3Ctx = useContext(D3Context);

  const textWidth = helpers.useWidth(range);
  const x = d3Ctx.x(range.startDate) / 2 + textWidth / 2;
  const y = -5;

  return (
    <div className="header-section" style={{ height, display: "block" }}>
      <svg width={width} height={height}>
        <g transform={`translate(0, ${height})`}>
          <text x={x} y={y} height={d3Ctx.y.bandwidth()} width={textWidth}>
            {range.name}
          </text>
        </g>
      </svg>
    </div>
  );
};
