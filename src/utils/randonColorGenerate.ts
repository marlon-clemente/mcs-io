export const randomColorGenerate = (): string => {
  let colorHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + colorHex.padStart(6, "0");
};
