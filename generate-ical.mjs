import daysData from "./days.json" with { type: "json" };

import fs from "fs";
import { getEventDate } from "./common.mjs";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function formatTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Days Calendar//EN
CALSCALE:GREGORIAN
`;

for (const event of daysData) {
  for (let year = 2020; year <= 2030; year++) {
    const eventDateObject = getEventDate(event, year);

    const startDateString = formatDate(eventDateObject);

    const nextDayObject = new Date(eventDateObject);
    nextDayObject.setDate(nextDayObject.getDate() + 1);
    const endDateString = formatDate(nextDayObject);

    const dtstamp = formatTimestamp(new Date());

    const uid = `${event.name.replace(/\s+/g, "-").toLowerCase()}-${year}@example.com`;

    ics += `
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${startDateString}
DTEND;VALUE=DATE:${endDateString}
SUMMARY:${event.name}
DESCRIPTION:${event.descriptionURL}
END:VEVENT
`;
  }
}

ics += "\nEND:VCALENDAR";

fs.writeFileSync("days.ics", ics);

console.log("days.ics generated successfully.");
