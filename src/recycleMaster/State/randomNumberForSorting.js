export function getRandomNumberForSorting(max = 8) {
  const r1 = Math.floor(Math.random() * (max + 1));
  const r2 = Math.floor(Math.random() * (max + 1));
  const s1 = Math.min(r1, r2);
  const s2 = Math.max(r1, r2);
  return [s1, s2];
}
