// 6時から23時まで30分刻みで表示する
export const SHIFT_TIMES = Array.from(Array(36)).map((_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
});
