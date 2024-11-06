'use client';
import Widget from '@/components/widget';
import LineChartComponent from '@/components/graphs/LineChartComponent';
import BarChartComponent from '@/components/graphs/BarChartComponent';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './page.css';
export const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app-container">
      <div className="widgets">
        <Widget
          name="Temperature"
          dataKey="temperature"
          GraphComponent={null}
        />
        <Widget name="Air Pressure" dataKey="pressure" GraphComponent={null} />
        <Widget name="Wind" dataKey="wind" GraphComponent={null} />
        <Widget name="CO2" dataKey="co2" GraphComponent={null} />
        <Widget name="Gas" dataKey="gas" GraphComponent={null} />
        <Widget name="Dust" dataKey="dust" GraphComponent={null} />
      </div>
    </div>
    </QueryClientProvider>
  );
}
