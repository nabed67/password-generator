import { randomInt } from "./random-int";
import { SYMBOLS } from "../data/symbols";
import { OBJECT_NAMES } from "../data/objects";

export function generatePassword(length) {
  const availableNames = OBJECT_NAMES.filter(
    (name) => name.length <= length - 2
  );

  const symbol = SYMBOLS[randomInt(SYMBOLS.length)];
  const name = availableNames[randomInt(availableNames.length)];

  const digitCount = length - name.length - 1;

  let digits = "";
  for (let i = 0; i < digitCount; i++) {
    digits += randomInt(10);
  }

  return `${name}${symbol}${digits}`;
}
