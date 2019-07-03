import moment from 'moment';

export const getOverallYears = date => {
  const currentYear = moment(date);
  const previousYear = currentYear.clone().subtract(1, 'y');
  const nextYear = currentYear.clone().add(1, 'y');

  return [
    previousYear.format('YYYY'),
    currentYear.format('YYYY'),
    nextYear.format('YYYY')
  ];
};

export const getOverallYearBoundaries = years => {
  let ranges = [];

  years.map(y => {
    ranges.push({
      name: y,
      startDate: moment(y, 'MMMM YYYY')
        .startOf('year')
        .toDate(),
      endDate: moment(y, 'MMMM YYYY')
        .endOf('year')
        .toDate()
    });
    return null;
  });
  return ranges;
};

export const getOverallBoundaries = years => {
  return {
    startDate: moment(`${years[0]}-01-01`)
      .startOf('year')
      .toDate(),
    endDate: moment(`${years[years.length - 1]}-01-01`)
      .endOf('year')
      .toDate(),
    name: 'Overall (prev, current, next)'
  };
};

export const getMonthsOfTheYear = date => {
  const year = moment(date).format('YYYY');
  let months = moment.months();
  return months.map(m => m + ' ' + year);
};

export const getYearBoundary = date => {
  const year = moment(date).format('YYYY');
  const startOfYear = moment(year).startOf('year');
  const endOfYear = moment(year).endOf('year');

  return {
    name: year,
    startDate: startOfYear.toDate(),
    endDate: endOfYear.toDate()
  };
};

export const getMonthsRange = months => {
  let ranges = [];
  months.map(month => {
    const startOfMonth = moment(month, 'MMM YYYY').startOf('month');
    const endOfMonth = moment(month, 'MMM YYYY').endOf('month');

    ranges.push({
      name: moment(startOfMonth).format('MMMM'),
      startDate: startOfMonth.toDate(),
      endDate: endOfMonth
        .clone()
        .add(1, 'd')
        .toDate()
    });
    return null;
  });

  return ranges;
};

export const getQuarter = date => {
  const m = moment(date).format('M');
  const year = moment(date).format('YYYY');
  if (m <= 3) {
    return `Q1 ${year}`;
  } else if (m >= 4 && m <= 6) {
    return `Q2 ${year}`;
  } else if (m >= 7 && m <= 9) {
    return `Q3 ${year}`;
  } else {
    return `Q4 ${year}`;
  }
};

export const getQuarterMonths = date => {
  const startQuarter = moment(date)
    .startOf('quarter')
    .format('MMM YYYY');

  const middleQuarter = moment(startQuarter)
    .add('month', 1)
    .format('MMM YYYY');

  const endQuarter = moment(date)
    .endOf('quarter')
    .format('MMM YYYY');

  return [startQuarter, middleQuarter, endQuarter];
};

export const getQuarterHeaderRanges = (months, quarter) => {
  return {
    startDate: moment(months[0], 'MMMM YYYY')
      .startOf('month')
      .toDate(),
    endDate: moment(months[months.length - 1], 'MMMM YYYY')
      .endOf('month')
      .toDate(),
    name: quarter
  };
};

export const getWeeksRange = (startDate, endDate) => {
  let ranges = [];

  const start = moment(startDate);
  const end = moment(endDate);
  ranges.push({
    name: 'Week 1',
    startDate: start
      .clone()
      .startOf('week')
      .format('MM/DD/YYYY'),
    endDate: start
      .clone()
      .endOf('week')
      .format('MM/DD/YYYY')
  });

  let count = 1;
  let day = start.clone();
  while (day < end) {
    const startOfWeek = start
      .clone()
      .add(count, 'w')
      .startOf('week');
    const endOfWeek = start
      .clone()
      .add(count, 'w')
      .endOf('week');

    day = endOfWeek.clone();

    count++;
    ranges.push({
      name: `Week ${count}`,
      startDate: startOfWeek.format('MM/DD/YYYY'),
      endDate: endOfWeek.format('MM/DD/YYYY')
    });
  }

  return ranges;
};

export const getMontlyBoundaries = (startDate, endDate) => {
  return {
    startDate: moment(startDate).toDate(),
    endDate: moment(endDate).toDate()
  };
};

export const getDaysRange = (startDate, endDate) => {
  let ranges = [];
  const s = moment(startDate);
  const e = moment(endDate);

  let day = s.clone();

  while (day <= e) {
    ranges.push({
      name: day.format('D MMM'),
      startDate: day.clone().format('MM/DD/YYYY'),
      endDate: day
        .clone()
        .add(1, 'd')
        .format('MM/DD/YYYY')
    });
    day = day.clone().add(1, 'd');
  }

  return ranges;
};

export const get = metrics => {
  let months = [];
  let headerRanges = [];
  let subHeaderRanges = [];
  let dateBoundary = [];

  if (metrics.type === 'overall') {
    const years = getOverallYears(metrics.startDate);
    headerRanges = [getOverallBoundaries(years)];
    months = [headerRanges[0].startDate, headerRanges[0].endDate];
    subHeaderRanges = getOverallYearBoundaries(years);
  } else if (metrics.type === 'yearly') {
    months = getMonthsOfTheYear(metrics.startDate);
    headerRanges = [getYearBoundary(metrics.startDate)];
    subHeaderRanges = getMonthsRange(months);
  } else if (metrics.type === 'quarterly') {
    const quarter = getQuarter(metrics.startDate);
    months = getQuarterMonths(metrics.startDate);
    subHeaderRanges = getMonthsRange(months);
    headerRanges = [getQuarterHeaderRanges(months, quarter)];
    if (metrics.subType === 'week') {
      subHeaderRanges = getWeeksRange(
        headerRanges[0].startDate,
        headerRanges[0].endDate
      );
    }
  } else if (metrics.type === 'monthly') {
    const sDate = moment(metrics.startDate);
    const eDate = metrics.endDate
      ? moment(metrics.endDate)
      : sDate.clone().endOf('month');
    subHeaderRanges = getWeeksRange(
      sDate.format('DD MMM YYYY'),
      eDate.format('DD MMM YYYY')
    );

    headerRanges = [
      getMontlyBoundaries(
        sDate.format('DD MMM YYYY'),
        eDate.format('DD MMM YYYY')
      )
    ];
    headerRanges[0].name = 'Monthly by Week - ' + sDate.format('MMM YYYY');
    months = [headerRanges[0].startDate, headerRanges[0].endDate];

    if (metrics.subType === 'days') {
      subHeaderRanges = getDaysRange(sDate, eDate);
    }
  }

  dateBoundary[0] = moment(months[0], 'MMM YYYY')
    .startOf('month')
    .toDate();
  dateBoundary[1] = moment(months[months.length - 1], 'MMM YYYY')
    .endOf('month')
    .toDate();

  return {
    months,
    headerRanges,
    subHeaderRanges,
    dateBoundary
  };
};
