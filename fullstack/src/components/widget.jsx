import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Tooltip from "@radix-ui/react-tooltip";
import "./widget.css";

// Define units and labels for each sensor type
const sensorMapping = {
  temperature: { unit: "°C", label: "Temperature" },
  pressure: { unit: "hPa", label: "Air Pressure" },
  wind: { unit: "km/h", label: "Wind Speed" },
  dust: { unit: "µg/m³", label: "Dust Reading" },
  co2: { unit: "ppm", label: "CO2 Levels" },
  gas: { unit: "ppm", label: "Gas Levels" },
  rain: { unit: "mm", label: "Rain Levels" },
  humidity: { unit: "%", label: "Humidity" },
};

// Tooltips for each sensor to give helpful context
const tooltipMapping = {
  temperature: "Shows current ambient temperature in Celsius...",
  pressure: "Displays air pressure in hectopascals...",
  wind: "Represents wind speed in kilometers per hour...",
  dust: "Shows airborne dust concentration...",
  co2: "Indicates CO₂ concentration in parts per million...",
  gas: "Reflects tvoc (Total volatile organic compounds)...",
  rain: "Indicates the current rainfall level in mm...",
  humidity: "Shows the relative humidity in percentage...",
};

// Fetch the latest sensor data
const fetchSensorData = async (dataKey) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/${dataKey}-data`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

// Fetch graph data for different durations
const fetchGraphData = async (dataKey, length) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let table, value;

  // Map dataKey to correct table and column name
  switch (dataKey) {
    case "rain":
      table = "rainfall_measurement";
      value = "rainfall_mm";
      break;
    case "co2":
      table = "co2";
      value = "co2_level";
      break;
    case "gas":
      table = "gas";
      value = "gas_level";
      break;
    case "wind":
      table = "wind";
      value = "wind_speed";
      break;
    case "humidity":
      table = "humidity";
      value = "humidity";
      break;
    default:
      table = dataKey;
      value = dataKey;
  }

  const response = await fetch(
    `${baseUrl}/api/get-graph-data?table=${table}&value=${value}&length=${length}`
  );
  if (!response.ok) throw new Error("Failed to fetch graph data");
  return response.json();
};

// Main widget component
const Widget = ({ name, dataKey, GraphComponent }) => {
  const [graphDataCache, setGraphDataCache] = useState({}); // Caches graph data by view length
  const [viewLength, setViewLength] = useState(1); // Current graph view (1=hourly, 7=weekly, etc.)
  const [openTooltip, setOpenTooltip] = useState(false); // Controls tooltip open state

  const graphData = graphDataCache[viewLength] || []; // Get current graph data

  // Fetch latest sensor data using React Query
  const { data, error, isLoading } = useQuery({
    queryKey: [dataKey],
    queryFn: () => fetchSensorData(dataKey),
    staleTime: 60000,
    cacheTime: 300000,
  });

  // Fetch and update graph data on mount and interval
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedGraphData = await fetchGraphData(dataKey, viewLength);
        setGraphDataCache((prev) => ({
          ...prev,
          [viewLength]: updatedGraphData,
        }));
      } catch (err) {
        console.error(`Error fetching ${viewLength}-day data:`, err);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 60000); // Refresh every 60s
    return () => clearInterval(interval); // Clean up
  }, [viewLength, dataKey]);

  // Switch between view lengths (hourly, 7 days, 30 days)
  const handleViewChange = async (length) => {
    setViewLength(length);
    if (!graphDataCache[length]) {
      try {
        const updatedGraphData = await fetchGraphData(dataKey, length);
        setGraphDataCache((prev) => ({
          ...prev,
          [length]: updatedGraphData,
        }));
      } catch (err) {
        console.error(`Error fetching ${length}-day data:`, err);
      }
    }
  };

  // Get the most recent data entry
  const latestData = data?.length ? data[data.length - 1] : null;

  // Display latest sensor value
  const renderLatestData = () => {
    if (isLoading) return "Loading...";
    if (error) return "Error fetching data";
    if (!latestData) return "No Data Available";

    let value;
    // Determine correct value from data based on key
    switch (dataKey) {
      case "temperature":
        value = latestData.avg_temperature;
        break;
      case "wind":
        value = parseFloat(latestData.wind_speed * 3.6).toFixed(2); // Convert m/s to km/h
        break;
      case "co2":
        value = latestData.co2_level;
        break;
      case "gas":
        value = latestData.gas_level;
        break;
      case "rain":
        value = parseFloat(latestData.rainfall_mm).toFixed(2);
        break;
      case "humidity":
        value = latestData.humidity;
        break;
      default:
        value = latestData[dataKey];
    }

    if (value == null) return "No Data Available";
    const unit = dataKey ? sensorMapping[dataKey]?.unit || "" : "";
    return `${value} ${unit}`;
  };

  // Toggle the info tooltip
  const handleTooltipToggle = () => {
    setOpenTooltip((prev) => !prev);
  };

  return (
    <div className="widget expanded relative rounded-lg">
      {/* Header with label and tooltip icon */}
      <div className="flex justify-between items-start p-4">
        <div className="flex items-center space-x-1">
          <p>{name}</p>
          <Tooltip.Provider>
            <Tooltip.Root open={openTooltip} onOpenChange={setOpenTooltip}>
              <Tooltip.Trigger asChild>
                <span
                  className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full text-lg cursor-pointer"
                  style={{ backgroundColor: "#113f67" }}
                  aria-label="Info"
                  onClick={handleTooltipToggle}
                >
                  i
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                align="center"
                className="bg-gray-700 text-white text-xs p-2 rounded shadow-lg max-w-xs"
                onPointerDownOutside={() => setOpenTooltip(false)}
              >
                {tooltipMapping[dataKey]}
                <Tooltip.Arrow className="fill-gray-700" />
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>

      {/* Latest value display */}
      <p className="px-4 pb-2">{renderLatestData()}</p>

      {/* Graph area */}
      {GraphComponent && (
        <>
          {/* View toggle buttons */}
          <div
            className="button-group flex justify-center space-x-2 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleViewChange(1)}
              className={`btn ${viewLength === 1 ? "active" : ""}`}
            >
              Hourly
            </button>
            <button
              onClick={() => handleViewChange(7)}
              className={`btn ${viewLength === 7 ? "active" : ""}`}
            >
              7 Days
            </button>
            <button
              onClick={() => handleViewChange(30)}
              className={`btn ${viewLength === 30 ? "active" : ""}`}
            >
              30 Days
            </button>
          </div>

          {/* Graph rendering */}
          <div
            className="graph-container custom-scrollbar flex items-center justify-center h-[300px] px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {graphData && graphData.length > 0 ? (
              <GraphComponent
                data={graphData}
                datakey="avg_value"
                viewType={viewLength === 1 ? "hourly" : "day"}
                xAxisLabel={viewLength === 1 ? "Time" : "Date"}
                yAxisLabel="Average Value"
                tooltipFormatter={(value) => `${value.toFixed(2)} units`}
              />
            ) : (
              <p className="text-center text-sm text-gray-500">
                No Data Available
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
