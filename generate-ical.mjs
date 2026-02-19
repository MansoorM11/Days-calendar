import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

console.log(`{getGreeting()} - there are ${daysData.length} known days`);
