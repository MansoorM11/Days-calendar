// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function createCalendarHeaders() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarHeader = document.getElementById("calendar-header");
  weekdays.forEach((weekday) => {
    const dayList = document.createElement("li");
    dayList.className = "weekdays";
    dayList.textContent = weekday;
    calendarHeader.append(dayList);
  });
  return calendarHeader;
}

const calendarHeader = createCalendarHeaders();

window.onload = function () {
  document.getElementById("default-message").innerText =
    `${getGreeting()} - there are ${daysData.length} known days`;
};
