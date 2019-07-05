import React from "react";

const GridRow = row => {
  const { width, rowHeight, parentY, projects } = row;

  const count = projects.length;
  const paddingTop = 4;
  let height = (rowHeight - paddingTop * count) / count;
  height = height > 10 ? 10 : height;

  return (
    <g>
      {projects &&
        projects.map((p, index) => {
          const y = parentY + height * index;

          return (
            <rect
              key={`${index}${p.id}`}
              x={0}
              y={y + paddingTop}
              width={width}
              height={height - paddingTop}
              fill={"#A0F0FA"}
            />
          );
        })}
    </g>
  );
};

export const Bars = props => {
  const { rows, rowHeight, headerHeight } = props;

  return (
    <g>
      {rows &&
        rows.map((r, i) => {
          const parentY = rowHeight * i + headerHeight;
          return (
            <GridRow
              key={r.id}
              {...r}
              parentY={parentY}
              projects={r.projects}
              rowHeight={rowHeight}
              width={props.width} // temp
            />
          );
        })}
    </g>
  );
};
