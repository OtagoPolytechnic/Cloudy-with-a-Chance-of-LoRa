import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Tooltip from '@radix-ui/react-tooltip';
import './widget.css';

const sensorMapping = {
  temperature: { unit: '°C', label: 'Temperature' },
  pressure: { unit: 'hPa', label: 'Air Pressure' },
  wind: { unit: 'km/h', label: 'Wind Speed' },
  dust: { unit: 'µg/m³', label: 'Dust Reading' },
  co2: { unit: 'ppm', label: 'CO2 Levels' },
  gas: { unit: 'ppm', label: 'Gas Levels' },
  rain: { unit: 'mm', label: 'Rain Levels' },
  humidity: { unit: '%', label: 'Humidity' },
};

const tooltipMapping = {
  temperature:
    'Shows current ambient temperature in Celsius. Comfortable indoor range: 20-25°C; low or high values may affect comfort and efficiency.',
  pressure:
    'Displays air pressure in hectopascals. Standard at sea level is 1013 hPa; variations can indicate weather changes.',
  wind: 'Represents wind speed in kilometers per hour. High speeds can influence ventilation and comfort in open areas.',
  dust: 'Shows airborne dust concentration in micrograms per cubic meter. Lower levels indicate better air quality; values above 50 µg/m³ may affect health.',
  co2: 'Indicates CO₂ concentration in parts per million. Levels below 1000 ppm are optimal indoors; higher levels suggest poor ventilation.',
  gas: 'Reflects tvoc (Total volatile organic compounds) concentration in parts per million. Elevated readings could signal indoor air quality issues or pollutant sources.',
  rain: 'Indicates the current rainfall level measured in millimeters per hour. Light rain is generally below 2.5 mm per hour',
  humidity:
    'Shows the relative humidity in percentage. Ideal indoor range is 30-50%; high levels can cause discomfort and mold growth.',
};

const fetchSensorData = async (dataKey) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/${dataKey}-data`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

const fetchGraphData = async (dataKey, length) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let table, value;

  switch (dataKey) {
    case 'rain':
      table = 'rainfall_measurement';
      value = 'rainfall_mm';
      break;
    case 'co2':
      table = 'co2';
      value = 'co2_level';
      break;
    case 'gas':
      table = 'gas';
      value = 'gas_level';
      break;
    case 'wind':
      table = 'wind';
      value = 'wind_speed';
      break;
    case 'humidity':
      table = 'humidity';
      value = 'humidity';
      break;
    default:
      table = dataKey;
      value = dataKey;
  }

  const response = await fetch(
    `${baseUrl}/api/get-graph-data?table=${table}&value=${value}&length=${length}`,
  );
  if (!response.ok) throw new Error('Failed to fetch graph data');
  return response.json();
};

const Widget = ({ name, dataKey, GraphComponent }) => {
  const [graphDataCache, setGraphDataCache] = useState({});
  const [viewLength, setViewLength] = useState(1);
  const [openTooltip, setOpenTooltip] = useState(false);
  const graphData = graphDataCache[viewLength] || [];

  const { data, error, isLoading } = useQuery({
    queryKey: [dataKey],
    queryFn: () => fetchSensorData(dataKey),
    staleTime: 60000,
    cacheTime: 300000,
  });

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

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [viewLength, dataKey]);

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

  const latestData = data?.length ? data[data.length - 1] : null;

  const renderLatestData = () => {
    if (isLoading) return 'Loading...';
    if (error) return 'Error fetching data';
    if (!latestData) return 'No Data Available';

    let value;
    switch (dataKey) {
      case 'temperature':
        value = latestData.avg_temperature;
        break;
      case 'wind':
        value = parseFloat(latestData.wind_speed * 3.6).toFixed(2);
        break;
      case 'co2':
        value = latestData.co2_level;
        break;
      case 'gas':
        value = latestData.gas_level;
        break;
      case 'rain':
        value = parseFloat(latestData.rainfall_mm).toFixed(2);
        break;
      case 'humidity':
        value = latestData.humidity;
        break;
      default:
        value = latestData[dataKey];
    }

    if (value == null) return 'No Data Available';
    const unit = dataKey ? sensorMapping[dataKey]?.unit || '' : '';
    return `${value} ${unit}`;
  };

  const handleTooltipToggle = () => {
    setOpenTooltip((prev) => !prev);
  };

  return (
    <div className="widget expanded relative rounded-lg">
      <div className="flex justify-between items-start p-4">
        <div className="flex items-center space-x-1">
          <p>{name}</p>
          <Tooltip.Provider>
            <Tooltip.Root open={openTooltip} onOpenChange={setOpenTooltip}>
              <Tooltip.Trigger asChild>
                <span
                  className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full text-lg cursor-pointer"
                  style={{ backgroundColor: '#113f67' }}
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

      <p className="px-4 pb-2">{renderLatestData()}</p>

      {GraphComponent && (
        <>
          <div
            className="button-group flex justify-center space-x-2 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleViewChange(1)}
              className={`btn ${viewLength === 1 ? 'active' : ''}`}
            >
              Hourly
            </button>
            <button
              onClick={() => handleViewChange(7)}
              className={`btn ${viewLength === 7 ? 'active' : ''}`}
            >
              7 Days
            </button>
            <button
              onClick={() => handleViewChange(30)}
              className={`btn ${viewLength === 30 ? 'active' : ''}`}
            >
              30 Days
            </button>
          </div>

          <div
            className="graph-container custom-scrollbar flex items-center justify-center h-[300px] px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {graphData && graphData.length > 0 ? (
              <GraphComponent
                data={graphData}
                datakey="avg_value"
                viewType={viewLength === 1 ? 'hourly' : 'day'}
                xAxisLabel={viewLength === 1 ? 'Time' : 'Date'}
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
