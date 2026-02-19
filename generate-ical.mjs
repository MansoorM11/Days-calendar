import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

import fs from "fs";
import { getEventDate } from "./date-logic.mjs";

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
    const eventDate = getEventDate(event, year);

    const startDate = formatDate(eventDate);

    const nextDay = new Date(eventDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDate = formatDate(nextDay);

    const dtstamp = formatTimestamp(new Date());

    const uid = `${event.name.replace(/\s+/g, "-").toLowerCase()}-${year}@example.com`;

    ics += `
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:${event.name}
DESCRIPTION:${event.descriptionURL}
END:VEVENT
`;
  }
}

ics += "\nEND:VCALENDAR";

fs.writeFileSync("days.ics", ics);

console.log("days.ics generated successfully.");
