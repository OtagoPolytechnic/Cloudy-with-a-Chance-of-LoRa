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
  calculateYAxisConfig,
  filterAndSortData,
  CustomXAxisTick,
} from '../../app/utils/chartUtils';

const BarChartComponent = ({ data, datakey, viewType }) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [chartHeight, setChartHeight] = useState(260);
  const [barSize, setBarSize] = useState(26);
  const [fontSize, setFontSize] = useState(12);

  const graphColor = '#113f67';
  const xyAxis = 'black';

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsScrollEnabled(width <= 1060);
      setChartHeight(width < 480 ? 220 : width < 768 ? 240 : 260);
      setBarSize(width < 480 ? 18 : 26);
      setFontSize(width < 768 ? 10 : 12);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { domain, ticks } = calculateYAxisConfig(data, datakey);
  const xAxisDataKey = viewType === 'hourly' ? 'hour' : 'day';
  const filteredData = filterAndSortData(data, xAxisDataKey, viewType);
  const isSingleData = filteredData.length === 1;

  const paddedData = isSingleData
    ? [
        { [xAxisDataKey]: '', [datakey]: 0 },
        filteredData[0],
        { [xAxisDataKey]: ' ', [datakey]: 0 },
      ]
    : filteredData;

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
        overflowX:
          viewType !== '7days' && isScrollEnabled ? 'auto' : 'hidden',
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
            <CartesianGrid stroke="white" strokeDasharray="5 5" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke={xyAxis}
              interval={0}
              tick={<CustomXAxisTick viewType={viewType} color={xyAxis} />}
              height={50}
              allowDuplicatedCategory={false}
            />
            <YAxis
              type="number"
              domain={domain}
              ticks={ticks}
              stroke={xyAxis}
              allowDecimals={false}
              tick={{ fontSize }}
            />
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
              labelFormatter={() => ''}
            />
            <Bar
              dataKey={datakey}
              fill={graphColor}
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
