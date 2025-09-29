export function getRandomNumberForSorting(maxNumber) {
  const randInt = () => Math.floor(Math.random() * (maxNumber + 1));
  const a = randInt();
  const b = randInt();
  const [lowNumber, highNumber] = a <= b ? [a, b] : [b, a];

  return { lowNumber, highNumber };
}
