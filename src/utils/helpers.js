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

export const intersectionsSum = dates => {
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
      date: d.endDate ? d.endDate : '2099-01-01',
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

export const intersectionsSubtract = (required, used) => {
  let flat = [];

  required.forEach(d => {
    flat.push({
      date: d.startDate,
      value: d.available,
      isStart: true,
      isMain: true
    });

    flat.push({
      date: d.endDate ? d.endDate : '2099-01-01',
      value: d.available,
      isStart: false,
      isMain: true
    });
  });

  used.forEach(d => {
    flat.push({
      date: d.startDate,
      value: d.assigned,
      isStart: true,
      isMain: false
    });

    flat.push({
      date: d.endDate ? d.endDate : '2099-01-01',
      value: d.assigned,
      isStart: false,
      isMain: false
    });
  });

  // sort the array from min > max
  flat.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // add the needed and the current value between 2 dates
  let assigned = 0;
  let available = 0;
  let intersections = [];
  for (let i = 0; i < flat.length - 1; i++) {
    const first = flat[i];
    const second = flat[i + 1];

    if (first.isMain && first.isStart) {
      available = first.value;
    } else if (first.isMain && !first.isStart) {
      available = 0;
    }

    if (!first.isMain) {
      assigned = first.value;
    }

    intersections.push({
      startDate: first.date,
      endDate: second.date,
      assigned,
      available
    });
  }

  return intersections;
};

export const getResourceOverallData = rows => {
  const rawData = JSON.parse(JSON.stringify(rows));
  let rowsDates = [];
  rawData.map((resource, rowIndex) => {
    let assignedDates = [];
    resource.projects.map(project => {
      project.assignments.map(a => {
        assignedDates.push({
          ...a
        });
        return null;
      });
      return null;
    });

    const iSum = intersectionsSum(assignedDates);
    const iSub = intersectionsSubtract(resource.availability, iSum);

    rowsDates.push(iSub);
    return null;
  });

  return rowsDates;
};
