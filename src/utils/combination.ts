export const combination = <T>(arr: T[], k: number): T[][] => {
  if (k === 0 || arr.length < k) {
    return [[]];
  }

  if (k === arr.length) {
    return [arr];
  }

  const [first, ...rest] = arr;

  const withFirst = combination(rest, k - 1).map((comb) => [first, ...comb]);
  const withoutFirst = combination(rest, k);

  return [...withFirst, ...withoutFirst];
};
