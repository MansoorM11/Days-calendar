import { getGreeting } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";
import { getEventDate } from "./date-logic.mjs";
import events from "./days.json" with { type: "json" };

test("Greeting is correct", () => {
  assert.equal(getGreeting(), "Hello");
});

test("Ada Lovelace Day 2020 is October 13", () => {
  const event = events.find((e) => e.name === "Ada Lovelace Day");
  const result = getEventDate(event, 2020);

  assert.equal(result.getFullYear(), 2020);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 13);
});

test("World Lemur Day 2020 is October 30", () => {
  const event = events.find((e) => e.name === "World Lemur Day");
  const result = getEventDate(event, 2020);

  assert.equal(result.getFullYear(), 2020);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 30);
});
