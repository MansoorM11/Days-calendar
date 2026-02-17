// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import daysData from "./days.json" with { type: "json" };

const state = {
  year: 0,
  month: 0,
};

function createCalendarHeaders() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarHeader = document.getElementById("calendar-header");
  weekdays.forEach((weekday, index) => {
    const dayLiElement = document.createElement("li");
    dayLiElement.className = "weekdays";
    dayLiElement.textContent = weekday;
    dayLiElement.dataset.value = index;
    dayLiElement.name = weekday;
    dayLiElement.ariaLabel = weekday;
    calendarHeader.append(dayLiElement);
  });
  return calendarHeader;
}

function populateMonthSelect() {
  const months = Array.from({ length: 12 }, (element, index) => {
    const dateObject = new Date(0, index);
    return dateObject.toLocaleString("en-GB", { month: "short" });
  });
  const monthSelect = document.getElementById("month-select");
  months.forEach((month, index) => {
    const monthOption = document.createElement("option");
    monthOption.textContent = month;
    monthOption.value = index;
    monthSelect.append(monthOption);
  });
}

function setMonth(monthValue) {
  state.month = monthValue;
}

function setYear(yearValue) {
  state.year = yearValue;
}

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  setYear(year);
  setMonth(month);

  const monthSelect = document.getElementById("month-select");
  monthSelect.value = month;
  const yearInput = document.getElementById("year-input");
  yearInput.value = year;
}

function getFirstAndLastDateObjectAndIndex() {
  const firstDateObject = new Date(state.year, state.month, 1);
  const weekdayIndexOfFirstDate = firstDateObject.getDay();
  const lastDateObject = new Date(state.year, state.month + 1, 0);
  const weekdayIndexOfLastDate = lastDateObject.getDay();

  return {
    firstDateObject,
    weekdayIndexOfFirstDate,
    lastDateObject,
    weekdayIndexOfLastDate,
  };
}

function createEmptySpace(startIndex, weekdayIndex) {
  const emptySpaceArray = [];
  for (
    let emptyNumber = startIndex;
    emptyNumber < weekdayIndex;
    emptyNumber++
  ) {
    const emptyDate = document.createElement("li");
    emptyDate.textContent = "";
    emptyDate.className = "empty-cell";
    emptySpaceArray.push(emptyDate);
  }
  return emptySpaceArray;
}

function createDateCell(dateNumber) {
  const dateCell = document.createElement("div");
  dateCell.className = "date-cell";
  const dateCellHeader = document.createElement("p");
  dateCellHeader.textContent = dateNumber;
  dateCellHeader.className = "date-cell-header";
  const dateCellBody = document.createElement("div");
  dateCellBody.className = "date-cell-body";

  dateCell.append(dateCellHeader, dateCellBody);
  return dateCell;
}

function createDatesOfMonth(firstDateObject, lastDateObject) {
  const datesArray = [];
  const firstDateNumber = firstDateObject.getDate();
  const lastDateNumber = lastDateObject.getDate();

  const weekdaysObject = {};

  for (
    let dateNumber = firstDateNumber;
    dateNumber <= lastDateNumber;
    dateNumber++
  ) {
    const dateCell = createDateCell(dateNumber);
    datesArray.push(dateCell);
    const weekdayIndex = new Date(state.year, state.month, dateNumber).getDay();
    const weekdaysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekdayKey = weekdaysArray[weekdayIndex];
    if (weekdaysObject[weekdayKey]) {
      weekdaysObject[weekdayKey].push(dateNumber);
    } else {
      weekdaysObject[weekdayKey] = [dateNumber];
    }
  }
  console.log(weekdaysObject);
  return { datesArray, weekdaysObject };
}

function filterSpecialDaysInTheMonth() {
  return daysData.filter(
    ({ monthName }) => new Date(`${monthName} 1`).getMonth() === state.month,
  );
}

function addSpecialDayOnCalendar(targetDateCell) {
  if (targetDateCell) {
    const eventTitle = document.createElement("p");
    eventTitle.textContent = "Hello";
    targetDateCell.querySelector(".date-cell-body").append(eventTitle);
  }
}

function findDateOfSpecialDays(weekdaysObject, datesArray) {
  const specialDays = filterSpecialDaysInTheMonth();
  console.log(specialDays);

  const occurrenceMap = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1,
  };

  specialDays.forEach(({ dayName, occurrence }) => {
    const datesArrayOfWeekday = weekdaysObject[dayName];
    const dateNumber =
      datesArrayOfWeekday[occurrenceMap[occurrence]] ||
      datesArrayOfWeekday[
        datesArrayOfWeekday.length + occurrenceMap[occurrence]
      ];
    console.log(dateNumber);
    // adding the day on calendar
    const targetDateCell = datesArray[dateNumber - 1];
    addSpecialDayOnCalendar(targetDateCell);
  });
}

function createMonthCalendar() {
  const calendarBody = document.getElementById("calendar-body");

  calendarBody.innerHTML = "";

  const {
    firstDateObject,
    weekdayIndexOfFirstDate,
    lastDateObject,
    weekdayIndexOfLastDate,
  } = getFirstAndLastDateObjectAndIndex();

  const emptySpaceAhead = createEmptySpace(0, weekdayIndexOfFirstDate);

  const { datesArray, weekdaysObject } = createDatesOfMonth(
    firstDateObject,
    lastDateObject,
  );

  const emptySpaceAfterward = createEmptySpace(weekdayIndexOfLastDate, 6);

  calendarBody.append(
    ...emptySpaceAhead,
    ...datesArray,
    ...emptySpaceAfterward,
  );

  findDateOfSpecialDays(weekdaysObject, datesArray);
}

function navigateClickHandler(addOneOrMinusOne) {
  const newDate = new Date(state.year, state.month + addOneOrMinusOne, 1);

  state.year = newDate.getFullYear();
  state.month = newDate.getMonth();

  document.getElementById("year-input").value = state.year;
  document.getElementById("month-select").value = state.month;

  createMonthCalendar();
}

function addListeners() {
  const monthSelect = document.getElementById("month-select");
  monthSelect.addEventListener("change", (e) => {
    setMonth(Number(e.target.value));
    createMonthCalendar();
  });

  const yearInput = document.getElementById("year-input");
  yearInput.addEventListener("input", (e) => {
    setYear(Number(e.target.value));
    createMonthCalendar();
  });

  const previousButton = document.getElementById("go-previous-button");
  previousButton.addEventListener("click", () => {
    navigateClickHandler(-1);
  });

  const nextButton = document.getElementById("go-next-button");
  nextButton.addEventListener("click", () => {
    navigateClickHandler(1);
  });
}

window.onload = function () {
  createCalendarHeaders();
  populateMonthSelect();
  getCurrentDate();
  createMonthCalendar();
  addListeners();
};
