import { useContext } from 'react';
import moment from 'moment';
import { D3Context } from '../context';

export function useWidth(node) {
  const d3Ctx = useContext(D3Context);
  const endsAfter = useEndsAfter(node);
  const startsBefore = useStartsBefore(node);
  const actualWidth = useActualWidth(node);

  if (endsAfter) {
    return Math.abs(
      d3Ctx.x(new Date(d3Ctx.dateBoundary[1])) -
        d3Ctx.x(new Date(node.startDate))
    );
  } else if (startsBefore) {
    return Math.abs(
      d3Ctx.x(new Date(d3Ctx.dateBoundary[0])) - d3Ctx.x(new Date(node.endDate))
    );
  } else {
    return actualWidth;
  }
}

export function useActualWidth(node) {
  const d3Ctx = useContext(D3Context);
  return Math.abs(
    d3Ctx.x(new Date(node.endDate)) - d3Ctx.x(new Date(node.startDate))
  );
}

export function useStartsBefore(node) {
  const d3Ctx = useContext(D3Context);
  return moment(node.startDate, 'MM/DD/YYYY').isBefore(d3Ctx.dateBoundary[0]);
}

export function useEndsAfter(node) {
  const d3Ctx = useContext(D3Context);

  return moment(node.endDate, 'MM/DD/YYYY').isAfter(d3Ctx.dateBoundary[1]);
}
