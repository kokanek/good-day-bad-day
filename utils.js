export function formatDate(date) {
  const year = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${year}-${mm}-${dd}`;
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function getDateInfo(d) {
  const day = weekdays[d.getDay()];
  const month = months[d.getMonth()]
  const date = d.getDate();

  return {
    date,
    day,
    month
  }
}

export function getMonthInfo(d) {
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return {
    month,
    year: year
  }
}

export function beautifyDate(d) {
  const date = d.split('-')[2];
  const month = months[d.split('-')[1] - 1];

  return `${month} ${date}`;
}