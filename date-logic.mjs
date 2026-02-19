const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const dayNumberMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const occurrenceMap = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: -1,
};

export function getEventDate(event, year) {
  const month = monthMap[event.monthName];
  const weekday = dayNumberMap[event.dayName];
  const occurrence = occurrenceMap[event.occurrence];

  return getNthWeekdayOfMonth(year, month, weekday, occurrence);
}

function getNthWeekdayOfMonth(year, month, weekday, occurrence) {
  const date = new Date(year, month, 1);
  let count = 0;

  if (occurrence > 0) {
    while (date.getMonth() === month) {
      if (date.getDay() === weekday) {
        count++;
        if (count === occurrence) {
          return new Date(date);
        }
      }
      date.setDate(date.getDate() + 1);
    }
  } else {
    date.setMonth(month + 1);
    date.setDate(0);

    while (date.getMonth() === month) {
      if (date.getDay() === weekday) {
        return new Date(date);
      }
      date.setDate(date.getDate() - 1);
    }
  }
}
