export function randomInt(max) {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;

  let value;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);

  return value % max;
}
