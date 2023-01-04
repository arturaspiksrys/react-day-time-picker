import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays
} from 'date-fns';

function generateDays(month) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const firstDay = startOfWeek(start);
  const lastDay = endOfWeek(end);

  const days = [];
  let day = firstDay;

  while (day <= lastDay) {
    days.push(day);
    day = addDays(day, 1);
  }

  return [start, days];
}

export default generateDays;
