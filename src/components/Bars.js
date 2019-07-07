import React, { useContext } from 'react';
import { select, selectAll } from 'd3';
import { D3Context } from '../context';
import { helpers } from '../utils';

const mouseOver = (event, a, d) => {
  const cls = select(event.target).attr('data-project');
  const elements = selectAll(`.${cls}`);
  elements.classed('isHover', true);

  // console.log('=>>> show tooltip');
};

const mouseLeave = event => {
  const cls = select(event.target).attr('data-project');
  const elements = selectAll(`.${cls}`);
  elements.classed('isHover', false);

  // console.log('====> remove tooltip');
};

const GridRow = row => {
  const { rowHeight, parentY, projects } = row;
  const d3Ctx = useContext(D3Context);

  const count = projects.length;
  const paddingTop = 2;
  let height = (rowHeight - paddingTop * count) / count;
  height = height > 10 ? 10 : height;

  return (
    <g>
      {projects &&
        projects.map((p, index) => {
          const y = parentY + height * index;

          const { assignments } = p;

          return assignments.map(a => {
            const translateX = d3Ctx.x(new Date(a.startDate));
            const w = a.startDate ? helpers.useActualWidth(a) : 0;

            return (
              <g
                key={`${a.startDate}-${parentY}`}
                transform={`translate(${translateX}, 0)`}
              >
                <rect
                  className={`horizontal-bar project-${p.id}`}
                  x={0}
                  y={y + paddingTop}
                  width={w}
                  height={height - paddingTop}
                  data-project={`project-${p.id}`}
                  onMouseOver={mouseOver}
                  onMouseLeave={mouseLeave}
                />
              </g>
            );
          });
        })}
    </g>
  );
};

export const Bars = props => {
  const { rows, rowHeight, paddingTop } = props;

  return (
    <g className="Bars">
      {rows &&
        rows.map((r, i) => {
          const parentY = rowHeight * i + paddingTop;
          return (
            <GridRow
              key={r.id}
              {...r}
              parentY={parentY}
              projects={r.projects}
              rowHeight={rowHeight}
            />
          );
        })}
    </g>
  );
};
