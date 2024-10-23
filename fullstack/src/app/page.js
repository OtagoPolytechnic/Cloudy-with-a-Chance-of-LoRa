'use client';
import Webcam from "@/components/Webcam/Webcam";
import Widget from "@/components/widget";
import LineChartComponent from "@/components/graphs/LineChartComponent";
import BarChartComponent from "@/components/graphs/BarChartComponent";
import "./page.css";

export default function Home() {
  return (
    <div className="app-container">
      <div className="widgets">
        <Widget name="Temperature" dataKey="temperature" GraphComponent={LineChartComponent} />
        <Widget name="Air Pressure" dataKey="pressure" GraphComponent={BarChartComponent} />
        <Widget name="Humidity" dataKey="humidity" GraphComponent={null} />
        <Widget name="Wind" dataKey="wind" GraphComponent={null} />
        <Widget name="CO2" dataKey="co2" GraphComponent={null} />
        <Widget name="Gas" dataKey="gas" GraphComponent={null} />
        <Widget name="Dust" dataKey="dust" GraphComponent={null} />
        <Webcam />
      </div>
    </div>
  );
}
