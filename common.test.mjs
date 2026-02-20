import { getEventDate } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("Ada Lovelace Day in 2024 should return the date on 8th", () => {
  const adaLoveLaceDay = {
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };
  const year = 2024;
  const expect = 8;
  const result = getEventDate(adaLoveLaceDay, year).getDate();
  assert.strictEqual(expect, result);
});

test("World Lemur Day in 2024 should return the date on 25th", () => {
  const worldLemurDay = {
    monthName: "October",
    dayName: "Friday",
    occurrence: "last",
  };
  const year = 2024;
  const expect = 25;
  const result = getEventDate(worldLemurDay, year).getDate();
  assert.strictEqual(expect, result);
});

test("Ada Lovelace Day in 2020 should return the date on 13th", () => {
  const adaLoveLaceDay = {
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };
  const year = 2020;
  const expect = 13;
  const result = getEventDate(adaLoveLaceDay, year).getDate();
  assert.strictEqual(expect, result);
});

test("World Lemur Day in 2020 should return the date on 30th", () => {
  const worldLemurDay = {
    monthName: "October",
    dayName: "Friday",
    occurrence: "last",
  };
  const year = 2020;
  const expect = 30;
  const result = getEventDate(worldLemurDay, year).getDate();
  assert.strictEqual(expect, result);
});

test("International Binturong Day in 2030 should return the date on 11", () => {
  const internationalBinturongDay = {
    monthName: "May",
    dayName: "Saturday",
    occurrence: "second",
  };
  const year = 2030;
  const expect = 11;
  const result = getEventDate(internationalBinturongDay, year).getDate();
  assert.strictEqual(expect, result);
});
