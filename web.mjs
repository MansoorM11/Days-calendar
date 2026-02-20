import daysData from "./days.json" with { type: "json" };
import { getEventDate, monthMap } from "./common.mjs";

const state = {
  year: 0,
  month: 0,
};

function createCalendarHeaders() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarHeader = document.getElementById("calendar-header");

  calendarHeader.innerHTML = "";

  weekdays.forEach((weekday) => {
    const dayLiElement = document.createElement("li");
    dayLiElement.className = "weekdays";
    dayLiElement.textContent = weekday;
    dayLiElement.name = weekday;
    dayLiElement.ariaLabel = weekday;
    calendarHeader.append(dayLiElement);
  });
  return calendarHeader;
}

function createMonthStringArray() {
  const monthStringArray = [];
  for (let index = 0; index < 12; index++) {
    const dateObject = new Date(0, index);
    monthStringArray.push(
      dateObject.toLocaleString("en-GB", { month: "short" }),
    );
  }
  return monthStringArray;
}

function populateMonthSelect() {
  const monthStringArray = createMonthStringArray();

  const monthSelect = document.getElementById("month-select");
  monthStringArray.forEach((monthString, index) => {
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

export function getFirstAndLastDateObjectAndIndex(
  targetYearNumber,
  targetMonthNumber,
) {
  const firstDateObject = new Date(targetYearNumber, targetMonthNumber, 1);
  const weekdayIndexOfFirstDate = firstDateObject.getDay();
  const lastDateObject = new Date(targetYearNumber, targetMonthNumber + 1, 0);
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
    const emptyDateCell = document.createElement("div");
    emptyDateCell.textContent = "";
    emptyDateCell.className = "empty-cell";
    emptyDateCell.name = "empty-space";
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
  return daysData.filter(({ monthName }) => monthMap[monthName] == monthNumber);
}

function attachEvent(targetDateCell, { name }) {
  if (targetDateCell) {
    const eventTitle = document.createElement("p");
    eventTitle.textContent = name;
    eventTitle.className = "event-title";
    targetDateCell.querySelector(".date-cell-body").append(eventTitle);
  }
}

function addSpecialDaysOnCalendar(dateCellsArray) {
  const specialDaysOfTheMonthObjectsArray = filterSpecialDaysByMonthName(
    state.month,
  );

  if (specialDaysOfTheMonthObjectsArray.length === 0) return;

  specialDaysOfTheMonthObjectsArray.forEach((specialDayObject) => {
    const exactDateNumberOfSpecialDay = getEventDate(
      specialDayObject,
      state.year,
    ).getDate();

    const targetDateCell = dateCellsArray[exactDateNumberOfSpecialDay - 1];
    attachEvent(targetDateCell, specialDayObject);
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
  } = getFirstAndLastDateObjectAndIndex(state.year, state.month);

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
    const yearInt = parseInt(e.target.value);
    if (!isNaN(yearInt)) {
      setYear(yearInt);
      createMonthCalendar();
    }
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

if (typeof window !== "undefined") {
  window.onload = function () {
    createCalendarHeaders();
    populateMonthSelect();
    getCurrentDate();
    createMonthCalendar();
    addListeners();
  };
}
