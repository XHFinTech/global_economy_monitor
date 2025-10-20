export default function Sparkline({ data = [], width = 160, height = 32, stroke = "#22c55e" }) {
  if (!data || data.length < 2) {
    return <svg className="spark" width={width} height={height}></svg>;
  }
  const xs = data.map((_, i) => i);
  const ys = data;
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeY = maxY - minY || 1;
  const stepX = width / (xs.length - 1);
  const points = xs.map((x, i) => {
    const px = i * stepX;
    const py = height - ((ys[i] - minY) / rangeY) * height;
    return `${px},${py}`;
  }).join(" ");
  const up = ys[ys.length - 1] >= ys[0];
  const color = up ? stroke : "#ef4444";
  return (
    <svg className="spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  );
}
