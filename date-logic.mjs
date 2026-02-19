export const monthMap = {
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

export function getEventDate({ monthName, dayName, occurrence }, yearNumber) {
  const monthNumber = monthMap[monthName];
  const weekdayIndex = dayNumberMap[dayName];
  const occurrenceNumber = occurrenceMap[occurrence];

  return getDateObjectOfTheEvent(
    yearNumber,
    monthNumber,
    weekdayIndex,
    occurrenceNumber,
  );
}

function getDateObjectOfTheEvent(
  yearNumber,
  monthNumber,
  weekdayIndex,
  occurrenceNumber,
) {
  const date = new Date(yearNumber, monthNumber, 1);
  let count = 0;

  if (occurrenceNumber > 0) {
    while (date.getMonth() === monthNumber) {
      if (date.getDay() === weekdayIndex) {
        count++;
        if (count === occurrenceNumber) {
          return new Date(date);
        }
      }
      date.setDate(date.getDate() + 1);
    }
  } else {
    date.setMonth(monthNumber + 1);
    date.setDate(0);

    while (date.getMonth() === monthNumber) {
      if (date.getDay() === weekdayIndex) {
        return new Date(date);
      }
      date.setDate(date.getDate() - 1);
    }
  }
}
