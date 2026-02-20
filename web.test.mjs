import { getFirstAndLastDateObjectAndIndex } from "./web.mjs";
import assert from "node:assert";
import test from "node:test";

test("2024-12: Sunday (no empty days before) - Tuesday (4 empty days after).", () => {
  const targetYear = 2024;
  const targetMonthIndex = 11;

  const expectEmptyDaysBefore = 0;
  const expectEmptyDaysAfter = 4;

  const { weekdayIndexOfFirstDate, weekdayIndexOfLastDate } =
    getFirstAndLastDateObjectAndIndex(targetYear, targetMonthIndex);

  const sundayIndex = 0;
  const saturdayIndex = 6;

  const actualEmptyDaysBefore = weekdayIndexOfFirstDate - sundayIndex;
  const actualEmptyDaysAfter = saturdayIndex - weekdayIndexOfLastDate;

  assert.equal(expectEmptyDaysBefore, actualEmptyDaysBefore);
  assert.equal(expectEmptyDaysAfter, actualEmptyDaysAfter);
});

test("2025-02: Saturday (6 days before) - Friday (1 empty day after).", () => {
  const targetYear = 2025;
  const targetMonthIndex = 1;

  const expectEmptyDaysBefore = 6;
  const expectEmptyDaysAfter = 1;

  const { weekdayIndexOfFirstDate, weekdayIndexOfLastDate } =
    getFirstAndLastDateObjectAndIndex(targetYear, targetMonthIndex);

  const sundayIndex = 0;
  const saturdayIndex = 6;

  const actualEmptyDaysBefore = weekdayIndexOfFirstDate - sundayIndex;
  const actualEmptyDaysAfter = saturdayIndex - weekdayIndexOfLastDate;

  assert.equal(expectEmptyDaysBefore, actualEmptyDaysBefore);
  assert.equal(expectEmptyDaysAfter, actualEmptyDaysAfter);
});

test("2025-05: Thursday (4 empty days before) - Saturday (no empty days after).", () => {
  const targetYear = 2025;
  const targetMonthIndex = 4;

  const expectEmptyDaysBefore = 4;
  const expectEmptyDaysAfter = 0;

  const { weekdayIndexOfFirstDate, weekdayIndexOfLastDate } =
    getFirstAndLastDateObjectAndIndex(targetYear, targetMonthIndex);

  const sundayIndex = 0;
  const saturdayIndex = 6;

  const actualEmptyDaysBefore = weekdayIndexOfFirstDate - sundayIndex;
  const actualEmptyDaysAfter = saturdayIndex - weekdayIndexOfLastDate;

  assert.equal(expectEmptyDaysBefore, actualEmptyDaysBefore);
  assert.equal(expectEmptyDaysAfter, actualEmptyDaysAfter);
});

test("2026-02: Sunday (no empty days before) - Saturday (no empty days after).", () => {
  const targetYear = 2026;
  const targetMonthIndex = 1;

  const expectEmptyDaysBefore = 0;
  const expectEmptyDaysAfter = 0;

  const { weekdayIndexOfFirstDate, weekdayIndexOfLastDate } =
    getFirstAndLastDateObjectAndIndex(targetYear, targetMonthIndex);

  const sundayIndex = 0;
  const saturdayIndex = 6;

  const actualEmptyDaysBefore = weekdayIndexOfFirstDate - sundayIndex;
  const actualEmptyDaysAfter = saturdayIndex - weekdayIndexOfLastDate;

  assert.equal(expectEmptyDaysBefore, actualEmptyDaysBefore);
  assert.equal(expectEmptyDaysAfter, actualEmptyDaysAfter);
});
