import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Sensor Mapping
const sensorMapping = {
  temperature: { unit: "°C", label: "Temperature" },
  pressure: { unit: "hPa", label: "Air Pressure" },
  humidity: { unit: "%", label: "Humidity" },
  wind: { unit: "km/h", label: "Wind Speed" },
  dust: { unit: "µg/m³", label: "Dust Reading" },
  co2: { unit: "ppm", label: "CO2 Levels" },
  gas: { unit: "ppm", label: "Gas Levels" },
};

// Fetch data dynamically based on the datakey
const fetchSensorData = async (dataKey) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/${dataKey}-data`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

const Widget = ({ name, dataKey, GraphComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch the data using React Query
  const { data, error, isLoading } = useQuery({
    queryKey: [dataKey],
    queryFn: () => fetchSensorData(dataKey),
  });

  const toggleExpand = () => {
    if (data) {
      setIsExpanded(!isExpanded);
    }
  };

  const latestData = data?.length ? data[data.length - 1] : null; // Get the latest data point

  const renderLatestData = () => {
    if (isLoading) return "Loading...";
    if (error) return "Error fetching data";
    if (!latestData) return "No Data Available"; 
  
    let value;
    switch (dataKey) {
      case "temperature":
        value = latestData.avg_temperature;
        break;
      case "wind":
        return `${latestData.wind_speed} km/h ${latestData.wind_direction}`; 
      case "co2":
        value = latestData.co2_level;
        break;
      case "gas":
        value = latestData.gas_level;
        break;
      default:
        value = latestData[dataKey];
    }
  
    if (value == null) return "No Data Available";
  
    const unit = dataKey !== "wind" ? sensorMapping[dataKey]?.unit || '' : '';
  
    return `${value} ${unit}`;
  };
  
  

  return (
    <div
      onClick={() => {
        if (GraphComponent) {
          toggleExpand();  // Only allow expansion if GraphComponent exists
        }
      }}
      className={`widget ${isExpanded ? "expanded" : ""} relative rounded-lg ${GraphComponent ? "cursor-pointer" : ""}`} // Add cursor pointer only if clickable
    >
      <div className="flex justify-between items-start p-4">
        <p>{name}</p>
      </div>
  
      <p className="px-4 pb-2"> {renderLatestData()}</p>
  
      {isExpanded && GraphComponent && (
        <div className="graph-container px-4 pb-4">
          <GraphComponent data={data} datakey={dataKey} />
        </div>
      )}
    </div>
  );
  
};

export default Widget;
