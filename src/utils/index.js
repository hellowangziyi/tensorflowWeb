export function drawPoint(x, y, r, color, ctx) {
  ctx.beginPath();
  ctx.fillStyle = color; // 设置填充颜色
  ctx.arc(x, y, r, 0, 2 * Math.PI); // 以 (50, 50) 为圆心，半径为 5 画圆
  ctx.fill(); // 填充圆
}

export function drawLine(startPoint, endPoint, color, ctx) {
  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  ctx.beginPath();
  ctx.moveTo(x1, y1); // 将画笔移动到 (50, 50) 的位置
  ctx.lineTo(x2, y2); // 从 (50, 50) 画一条到 (100, 100) 的线段
  ctx.strokeStyle = color; // 设置线段颜色
  ctx.lineWidth = 4; // 设置宽度
  ctx.stroke(); // 绘制线段
}
