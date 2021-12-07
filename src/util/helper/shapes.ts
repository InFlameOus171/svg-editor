export const createRect = (
  x: number,
  y: number,
  height: number,
  width: number
) => {
  const path = new Path2D();
  path.rect(x, y, height, width);
  return path;
};
