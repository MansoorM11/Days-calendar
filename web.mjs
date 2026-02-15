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

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  state.year = year;
  state.month = month;

  console.log(state.year);
  console.log(state.month);
}

function populateMonthSelect() {
  const months = Array.from({ length: 12 }, (element, index) => {
    return new Date(0, index).toLocaleString("en-GB", { month: "short" });
  });
  console.log(months);
  const monthSelect = document.getElementById("month-select");
  months.forEach((month, index) => {
    const monthOption = document.createElement("option");
    monthOption.textContent = month;
    monthOption.value = index;
    monthSelect.append(monthOption);
  });
}

window.onload = function () {
  createCalendarHeaders();
  getCurrentDate();
  populateMonthSelect();
};
