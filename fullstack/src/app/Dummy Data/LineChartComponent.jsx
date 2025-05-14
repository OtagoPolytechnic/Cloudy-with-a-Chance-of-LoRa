import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function LineChartComponent({ data, dataKey, unit }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="time" stroke="#000" />
        <YAxis stroke="#000" unit={unit} />
        <Tooltip
          formatter={(value) => `${value} ${unit || ''}`}
          labelStyle={{ color: "#000" }}
          contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#1f2937"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
