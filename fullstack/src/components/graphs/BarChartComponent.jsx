import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  calculateYAxisConfig, // Utility to dynamically set Y-axis domain and ticks
  filterAndSortData, // Filters and orders chart data by X-axis key
  CustomXAxisTick, // Custom X-axis label renderer
} from '../../app/utils/chartUtils';

const BarChartComponent = ({ data, datakey, viewType }) => {
  // Responsive layout states
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [chartHeight, setChartHeight] = useState(260);
  const [barSize, setBarSize] = useState(26);
  const [fontSize, setFontSize] = useState(12);

  const graphColor = '#113f67'; // Main color for bars and tooltips
  const xyAxis = 'black'; // Axis label color

  // Responsive adjustments on window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsScrollEnabled(width <= 1060);
      setChartHeight(width < 480 ? 220 : width < 768 ? 240 : 260);
      setBarSize(width < 480 ? 18 : 26);
      setFontSize(width < 768 ? 10 : 12);
    };

    handleResize(); // Initial run
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Y-axis settings and X-axis key (hour or day)
  const { domain, ticks } = calculateYAxisConfig(data, datakey);
  const xAxisDataKey = viewType === 'hourly' ? 'hour' : 'day';

  // Prepare and optionally pad data for rendering
  const filteredData = filterAndSortData(data, xAxisDataKey, viewType);
  const isSingleData = filteredData.length === 1;

  // Add padding bars if only one data point is present to prevent rendering issues
  const paddedData = isSingleData
    ? [
        { [xAxisDataKey]: '', [datakey]: 0 },
        filteredData[0],
        { [xAxisDataKey]: ' ', [datakey]: 0 },
      ]
    : filteredData;

  // Calculate scrollable width for small screens unless it's a 7-day view
  const containerWidth =
    viewType !== '7days' && isScrollEnabled
      ? `${Math.max(paddedData.length * 48, 400)}px`
      : '100%';

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        marginTop: '10px',
        overflowX: viewType !== '7days' && isScrollEnabled ? 'auto' : 'hidden',
      }}
    >
      <div
        style={{
          width: isSingleData ? 360 : containerWidth,
          margin: '0 auto',
        }}
      >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={paddedData}
            margin={{ top: 20, right: 22, left: 0, bottom: 25 }}
          >
            {/* Grid lines for background */}
            <CartesianGrid stroke="white" strokeDasharray="5 5" />

            {/* X-axis customization */}
            <XAxis
              dataKey={xAxisDataKey}
              stroke={xyAxis}
              interval={0} // Always show all labels
              tick={<CustomXAxisTick viewType={viewType} color={xyAxis} />}
              height={50}
              allowDuplicatedCategory={false}
            />

            {/* Y-axis customization */}
            <YAxis
              type="number"
              domain={domain}
              ticks={ticks}
              stroke={xyAxis}
              allowDecimals={false}
              tick={{ fontSize }}
            />

            {/* Tooltip configuration */}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: graphColor,
                borderRadius: '8px',
                padding: '5px',
                fontSize: fontSize - 2,
              }}
              itemStyle={{ color: graphColor }}
              labelFormatter={() => ''} // Hide X-axis label in tooltip
            />

            {/* Bar configuration */}
            <Bar
              dataKey={datakey}
              fill={graphColor}
              radius={[4, 4, 0, 0]} // Rounded top corners
              barSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
