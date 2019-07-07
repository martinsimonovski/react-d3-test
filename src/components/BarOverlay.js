import React, { useContext } from 'react';
import { D3Context } from '../context';
import { helpers } from '../utils';

const getTooltipHtml = item => {
  return `
  <p>
    Available: <strong>${item.available}%</strong>
    <br />
    Assigned: <strong>${item.assigned}%</strong>
  </p>
`;
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
              fill={overlay.assigned > overlay.available ? '#FF0000' : ''}
              stroke={overlay.assigned > overlay.available ? '#000000' : ''}
              style={{ opacity: 0.1 }}
              transform={`translate(${d3Ctx.x(new Date(overlay.startDate))})`}
              data-tip={getTooltipHtml(overlay)}
              data-class="tooltip-error"
              data-type={`error`}
              data-html={true}
            />
          );
        })}
    </g>
  );
};

export const BarOverlay = props => {
  const { rows, rowHeight, paddingTop } = props;

  const overall = helpers.getResourceOverallData(rows);

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
