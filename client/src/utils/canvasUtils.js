import { debounce } from "lodash";

export const drawPath = (context, pathData) => {
  if (pathData && pathData.points && pathData.points.length > 1) {
    context.beginPath();
    context.moveTo(pathData.startX, pathData.startY);
    for (let i = 0; i < pathData.points.length - 1; i++) {
      const { x, y } = pathData.points[i];
      const { x: nextX, y: nextY } = pathData.points[i + 1];
      context.quadraticCurveTo(x, y, (x + nextX) / 2, (y + nextY) / 2);
    }
    context.lineTo(
      pathData.points[pathData.points.length - 1].x,
      pathData.points[pathData.points.length - 1].y
    );
    context.stroke();
  }
};

export const debouncedDrawPath = debounce((context, pathData) => {
  if (pathData && pathData.points && pathData.points.length > 1) {
    context.beginPath();
    context.moveTo(pathData.startX, pathData.startY);
    for (let i = 0; i < pathData.points.length - 1; i++) {
      const { x, y } = pathData.points[i];
      const { x: nextX, y: nextY } = pathData.points[i + 1];
      context.quadraticCurveTo(x, y, (x + nextX) / 2, (y + nextY) / 2);
    }
    context.lineTo(
      pathData.points[pathData.points.length - 1].x,
      pathData.points[pathData.points.length - 1].y
    );
    context.stroke();
  }
}, 10);
