import React from 'react';
import { parseISO, format } from 'date-fns';

export function calculateYAxisConfig(
  data,
  dataKey,
  minRange = 0,
  maxRange = 4000,
) {
  if (!data || data.length === 0) {
    return { domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10] }; // Fallback for empty data
  }

  const values = data.map((item) => item[dataKey]);

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  // Allow dynamic scaling based on the provided min and max range
  const adjustedMinValue = Math.max(minValue, minRange);
  const adjustedMaxValue = Math.min(maxValue, maxRange);

  let stepSize;

  // Adjusting for graphs without actually adjusting for each type (sorry)
  // Catches rain and dust graphs
  if (adjustedMaxValue < 0.5) {
    stepSize = 0.1;
  } else if (adjustedMaxValue < 2) {
    stepSize = 0.2;
  }
  // Larger catches for rain and dust and wind
  else if (adjustedMaxValue < 5) {
    stepSize = 1;
  } else if (adjustedMaxValue < 10) {
    stepSize = 2;
  }
  // Temperature catch
  else if (adjustedMaxValue < 40) {
    stepSize = 5;
  }
  // Humidity catch
  else if (adjustedMaxValue < 100) {
    stepSize = 25;
  }
  // Air pressure catch
  else if (adjustedMaxValue < 2000 && adjustedMaxValue > 800) {
    stepSize = 5;
  } //Dynamic calculation (Gets gas)
  else {
    stepSize = Math.ceil((adjustedMaxValue - adjustedMinValue) / 10);
    // Check if stepSize can be rounded to the nearest multiple of 5 or 2
    if (stepSize % 5 !== 0 && stepSize % 2 !== 0) {
      let nearestMultipleOf5 = Math.ceil(stepSize / 5) * 5;
      let nearestMultipleOf2 = Math.ceil(stepSize / 2) * 2;
      // Choose the smaller of the two that is still larger than the current stepSize
      if (nearestMultipleOf5 >= stepSize) {
        stepSize = nearestMultipleOf5;
      } else {
        stepSize = nearestMultipleOf2;
      }
    }
  }

  // Calculate the adjusted maxY and minY
  const maxY = Math.ceil(adjustedMaxValue / stepSize) * stepSize;
  const minY = Math.floor(adjustedMinValue / stepSize) * stepSize;

  const ticks = [];
  for (let i = minY; i <= maxY; i += stepSize) {
    ticks.push(i);
  }

  return {
    domain: [minY, maxY],
    ticks: ticks,
  };
}

export function filterAndSortData(data, xAxisDataKey, viewType) {
  const validData = data.filter(
    (item) => item[xAxisDataKey] !== undefined && item[xAxisDataKey] !== null,
  );

  const sortedData = validData.slice().sort((a, b) => {
    const dateA = parseISO(a[xAxisDataKey]);
    const dateB = parseISO(b[xAxisDataKey]);
    return isNaN(dateA) || isNaN(dateB) ? 0 : dateA - dateB;
  });

  return sortedData.slice(viewType === 'hourly' ? -24 : -30);
}

// Custom tick component for displaying date and day
export const CustomXAxisTick = ({ x, y, payload, viewType, color }) => {
  try {
    let displayDate = payload.value;
    if (viewType === 'hourly') {
      // For hourly, format as "11am, 12pm"
      const time = new Date(displayDate);
      displayDate = format(time, 'haaa');
    } else {
      // For daily, format as "dd/MM" on the first line and "EEE" on the second line
      const date = parseISO(payload.value);
      const formattedDate = format(date, 'dd/MM');
      const formattedDay = format(date, 'EEE');
      displayDate = (
        <>
          <tspan x={0} dy="1em">
            {formattedDate}
          </tspan>
          <tspan x={0} dy="1em">
            {formattedDay}
          </tspan>
        </>
      );
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="end"
          fill={color}
          fontSize={10}
          transform="rotate(-45)"
        >
          {displayDate}
        </text>
      </g>
    );
  } catch (error) {
    console.error(
      'Error formatting date:',
      error,
      'Original value:',
      payload.value,
    );
    return null;
  }
};
