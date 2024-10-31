import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Tooltip from '@radix-ui/react-tooltip';
import './WidgetBase.css';

// Sensor Mapping
const sensorMapping = {
  temperature: { unit: '°C', label: 'Temperature' },
  pressure: { unit: 'hPa', label: 'Air Pressure' },
  wind: { unit: 'km/h', label: 'Wind Speed' },
  dust: { unit: 'µg/m³', label: 'Dust Reading' },
  co2: { unit: 'ppm', label: 'CO2 Levels' },
  gas: { unit: 'ppm', label: 'Gas Levels' },
};

const tooltipMapping = {
  temperature:
    'Shows current ambient temperature in Celsius. Comfortable indoor range: 20-25°C; low or high values may affect comfort and efficiency.',
  pressure:
    'Displays air pressure in hectopascals (hPa). Standard at sea level is 1013 hPa; variations can indicate weather changes.',
  wind: 'Represents wind speed in km/h and direction. High speeds can influence ventilation and comfort in open areas.',
  dust: 'Shows airborne dust concentration in µg/m³. Lower levels indicate better air quality; values above 50 µg/m³ may affect health.',
  co2: 'Indicates CO₂ concentration in ppm. Levels below 1000 ppm are optimal indoors; higher levels suggest poor ventilation.',
  gas: 'Reflects gas concentration in ppm. Elevated readings could signal indoor air quality issues or pollutant sources.',
};

// Fetch data dynamically based on the datakey
const fetchSensorData = async (dataKey) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/${dataKey}-data`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

const Widget = ({ name, dataKey, GraphComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

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
    if (isLoading) return 'Loading...';
    if (error) return 'Error fetching data';
    if (!latestData) return 'No Data Available';

    let value;
    switch (dataKey) {
      case 'temperature':
        value = latestData.avg_temperature;
        break;
      case 'wind':
        value = latestData.wind_speed;
        break;
      case 'co2':
        value = latestData.co2_level;
        break;
      case 'gas':
        value = latestData.gas_level;
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
    <div
      onClick={() => {
        if (GraphComponent) {
          toggleExpand(); // Only allow expansion if GraphComponent exists
        }
      }}
      className={`widget ${isExpanded ? 'expanded' : ''} relative rounded-lg ${GraphComponent ? 'cursor-pointer' : ''}`} // Add cursor pointer only if clickable
    >
      <div className="flex justify-between items-start p-4">
        <div className="flex items-center space-x-1">
          <p>{name}</p>

          {/* Tooltip with hover and click functionality */}
          <Tooltip.Provider>
            <Tooltip.Root open={openTooltip} onOpenChange={setOpenTooltip}>
              <Tooltip.Trigger asChild>
                <span
                  className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full text-lg cursor-pointer"
                  style={{ backgroundColor: 'hsla(0, 0%, 100%, .15)' }}
                  aria-label="Info"
                  onClick={handleTooltipToggle} // Add click functionality
                >
                  i
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                align="center"
                className="bg-gray-700 text-white text-xs p-2 rounded shadow-lg max-w-xs"
                onPointerDownOutside={() => setOpenTooltip(false)} // Close when clicking outside
              >
                {tooltipMapping[dataKey]}
                <Tooltip.Arrow className="fill-gray-700" />
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
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
