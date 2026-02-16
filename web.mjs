// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
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
    return new Date(0, index).toLocaleString("en-GB", { month: "short" });
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

function createMonthCalendar() {
  const calendarBody = document.getElementById("calendar-body");

  const firstDate = new Date(state.year, state.month, 1);
  const weekdayIndexOfFirstDate = firstDate.getDay();
  const lastDate = new Date(state.year, state.month + 1, 0).getDate();

  for (let emptySpace = 0; emptySpace < weekdayIndexOfFirstDate; emptySpace++) {
    const emptyDate = document.createElement("li");
    emptyDate.textContent = "X";
    emptyDate.className = "date-cell";
    calendarBody.append(emptyDate);
  }

  for (let dateNumber = 1; dateNumber <= lastDate; dateNumber++) {
    const dateCell = document.createElement("li");
    dateCell.textContent = dateNumber;
    dateCell.className = "date-cell";
    calendarBody.append(dateCell);
  }
}

window.onload = function () {
  createCalendarHeaders();
  populateMonthSelect();
  getCurrentDate();
  createMonthCalendar();
};
