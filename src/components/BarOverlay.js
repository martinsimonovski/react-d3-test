import React, { useContext } from "react";
import { D3Context } from "../context";
import { helpers } from "../utils";

const intersectionsSum = dates => {
  // TODO: possible bug, what if there are overlapping dates
  // make a flat array with borders next to eachother
  let flat = [];
  dates.forEach(d => {
    flat.push({
      date: d.startDate,
      assigned: d.assigned,
      isStart: true
    });

    flat.push({
      date: d.endDate ? d.endDate : "2099-01-01",
      assigned: d.assigned,
      isStart: false
    });
  });

  // sort the array from min > max
  flat.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // always compare 2 dates and just add/subtract the value
  let current = 0;
  let intersections = [];
  for (let i = 0; i < flat.length - 1; i++) {
    const first = flat[i];
    const second = flat[i + 1];

    if (first.isStart) {
      current = current + first.assigned;
    } else {
      current = current - first.assigned;
    }

    intersections.push({
      startDate: first.date,
      endDate: second.date,
      assigned: current
    });
  }

  return intersections;
};

const getResourceOverallData = rows => {
  const rawData = JSON.parse(JSON.stringify(rows));
  let rowsDates = [];
  rawData.map((resource, rowIndex) => {
    let resourceDates = [];
    resource.projects.map(project => {
      project.assignments.map(a => {
        resourceDates.push({
          ...a
        });
      });
    });

    rowsDates.push(intersectionsSum(resourceDates));
    return null;
  });

  return rowsDates;
};

const RowOverlay = props => {
  const d3Ctx = useContext(D3Context);
  const { overlays, height, y } = props;
  return (
    <g>
      {overlays &&
        overlays.map((overlay, i) => {
          return (
            <rect
              key={i}
              x={0}
              y={y + 3}
              height={height - 6}
              width={
                overlay.startDate && overlay.assigned > 100
                  ? helpers.useActualWidth(overlay)
                  : 0
              }
              fill={overlay.assigned > 100 ? "#FF0000" : ""}
              style={{ opacity: 0.1 }}
              transform={`translate(${d3Ctx.x(new Date(overlay.startDate))})`}
            />
          );
        })}
    </g>
  );
};

export const BarOverlay = props => {
  const { rows, rowHeight, paddingTop } = props;

  const overall = getResourceOverallData(rows);

  return (
    <g className="BarOverlay">
      {overall.map((row, i) => (
        <RowOverlay
          key={i}
          overlays={row}
          height={rowHeight}
          y={rowHeight * i + paddingTop}
        />
      ))}
    </g>
  );
};
