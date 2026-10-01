interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / (data.length * 1.5);

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 sm:gap-4" style={{ height }}>
        {data.map((d) => {
          const h = (d.value / max) * (height - 40);
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center justify-end group">
              <span className="text-xs font-semibold text-gray-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.value}
              </span>
              <div
                className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative"
                style={{
                  height: `${h}px`,
                  background: d.color || 'linear-gradient(to top, #059669, #34d399)',
                }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">
                  {d.value}
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-2 text-center truncate w-full" title={d.label}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export function DonutChart({ data, size = 180 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2;
  const stroke = 28;
  const innerRadius = radius - stroke;
  const circumference = 2 * Math.PI * innerRadius;
  let offset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={size} height={size} className="flex-shrink-0">
        <g transform={`rotate(-90 ${radius} ${radius})`}>
          {data.map((d) => {
            const fraction = d.value / total;
            const dash = fraction * circumference;
            const circle = (
              <circle
                key={d.label}
                cx={radius}
                cy={radius}
                r={innerRadius}
                fill="none"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return circle;
          })}
        </g>
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" className="text-2xl font-bold fill-gray-800">
          {total}
        </text>
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
            <span className="text-gray-600">{d.label}</span>
            <span className="font-semibold text-gray-800 ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export function LineChart({ data, height = 200 }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 100;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = height - 30 - (d.value / max) * (height - 50);
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${width} ${height - 30} L 0 ${height - 30} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#lineGradient)" />
        <path d={path} fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="1.2" fill="#3b82f6" />
            <text x={p.x} y={height - 10} textAnchor="middle" className="text-[3px] fill-gray-500">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
