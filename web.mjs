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
    dayLiElement.value = index;
    dayLiElement.name = weekday;
    dayLiElement.ariaLabel = weekday;
    calendarHeader.append(dayLiElement);
  });
  return calendarHeader;
}

function populateMonthSelect() {
  const monthsArray = Array.from({ length: 12 }, (element, index) => {
    const dateObject = new Date(0, index);
    return dateObject.toLocaleString("en-GB", { month: "short" });
  });
  const monthSelect = document.getElementById("month-select");
  monthsArray.forEach((monthString, index) => {
    const monthOption = document.createElement("option");
    monthOption.textContent = monthString;
    monthOption.value = index;
    monthSelect.append(monthOption);
  });
}

function setMonth(monthNumber) {
  state.month = monthNumber;
}

function setYear(yearNumber) {
  state.year = yearNumber;
}

function getCurrentDate() {
  const date = new Date();
  const yearNumber = date.getFullYear();
  const monthNumber = date.getMonth();

  setYear(yearNumber);
  setMonth(monthNumber);

  const monthSelect = document.getElementById("month-select");
  monthSelect.value = monthNumber;
  const yearInput = document.getElementById("year-input");
  yearInput.value = yearNumber;
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
    const emptyDateCell = document.createElement("li");
    emptyDateCell.textContent = "";
    emptyDateCell.className = "empty-cell";
    emptyDateCell.ariaLabel = "empty-space";
    emptySpaceArray.push(emptyDateCell);
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

function createObjectOfWeekdayArrays(targetYear, targetMonth) {
  const firstDateObject = new Date(targetYear, targetMonth, 1);
  const lastDateObject = new Date(targetYear, targetMonth + 1, 0);
  const firstDateNumber = firstDateObject.getDate();
  const lastDateNumber = lastDateObject.getDate();

  const objectOfWeekdayArrays = {};

  for (
    let dateNumber = firstDateNumber;
    dateNumber <= lastDateNumber;
    dateNumber++
  ) {
    const weekdayIndex = new Date(targetYear, targetMonth, dateNumber).getDay();
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
    if (objectOfWeekdayArrays[weekdayKey]) {
      objectOfWeekdayArrays[weekdayKey].push(dateNumber);
    } else {
      objectOfWeekdayArrays[weekdayKey] = [dateNumber];
    }
  }
  console.log(objectOfWeekdayArrays);
  return objectOfWeekdayArrays;
}

function createDatesOfMonth(firstDateObject, lastDateObject) {
  const dateCellsArray = [];
  const firstDateNumber = firstDateObject.getDate();
  const lastDateNumber = lastDateObject.getDate();

  for (
    let dateNumber = firstDateNumber;
    dateNumber <= lastDateNumber;
    dateNumber++
  ) {
    const dateCell = createDateCell(dateNumber);
    dateCellsArray.push(dateCell);
  }
  return dateCellsArray;
}

function filterSpecialDaysByMonthName(monthNumber) {
  return daysData.filter(
    ({ monthName }) => convertMonthNameToNumber(monthName) == monthNumber,
  );
}

function attachEvent(targetDateCell, { name }) {
  if (targetDateCell) {
    const eventTitle = document.createElement("p");
    eventTitle.textContent = name;
    eventTitle.className = "event-title";
    targetDateCell.querySelector(".date-cell-body").append(eventTitle);
  }
}

function convertMonthNameToNumber(monthName) {
  return new Date(`${monthName} 1`).getMonth();
}

function findOccurrenceIndex(occurrence) {
  const occurrenceMap = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1,
  };

  return occurrenceMap[occurrence];
}

function findMonthNumberAndDateNumber(
  year,
  { monthName, dayName, occurrence },
) {
  const monthNumber = convertMonthNameToNumber(monthName);

  const occurrenceIndex = findOccurrenceIndex(occurrence);
  const objectOfWeekdayArrays = createObjectOfWeekdayArrays(year, monthNumber);
  const weekdayArray = objectOfWeekdayArrays[dayName];
  const exactDateNumberOfSpecialDay =
    weekdayArray[occurrenceIndex] ||
    weekdayArray[weekdayArray.length + occurrenceIndex];
  console.log(exactDateNumberOfSpecialDay);

  return { monthNumber, exactDateNumberOfSpecialDay };
}

function addSpecialDaysOnCalendar(dateCellsArray) {
  const specialDaysOfTheMonthArray = filterSpecialDaysByMonthName(state.month);
  console.log(specialDaysOfTheMonthArray);

  specialDaysOfTheMonthArray.forEach((specialDay) => {
    const { exactDateNumberOfSpecialDay } = findMonthNumberAndDateNumber(
      state.year,
      specialDay,
    );

    const targetDateCell = dateCellsArray[exactDateNumberOfSpecialDay - 1];
    attachEvent(targetDateCell, specialDay);
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

  const sundayIndex = 0;
  const saturdayIndex = 6;

  const emptySpaceAhead = createEmptySpace(
    sundayIndex,
    weekdayIndexOfFirstDate,
  );

  const dateCellsArray = createDatesOfMonth(firstDateObject, lastDateObject);

  const emptySpaceAfterward = createEmptySpace(
    weekdayIndexOfLastDate,
    saturdayIndex,
  );

  calendarBody.append(
    ...emptySpaceAhead,
    ...dateCellsArray,
    ...emptySpaceAfterward,
  );

  addSpecialDaysOnCalendar(dateCellsArray);
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
