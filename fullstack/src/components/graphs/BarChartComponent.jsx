import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateYAxisConfig } from '../../app/utils/chartUtils'; 

const BarChartComponent = ({ data, datakey }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const { domain, ticks } = calculateYAxisConfig(data, datakey);

  // Transform the data for mobile view only, use full day names otherwise
  const transformedData = isMobile
    ? data.map(item => ({ ...item, day: item.day.charAt(0) })) // 'M', 'T', 'W', etc. for mobile
    : data; // Full day names for larger screens

  return (
    <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
      <ResponsiveContainer>
        <BarChart 
          data={transformedData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="day" 
            stroke="#113f67" 
            tick={{ fontSize: isMobile ? 8 : 12 }} 
          />
          <YAxis 
            stroke="#113f67" 
            allowDecimals={false} 
            padding={{ top: 10 }} 
            tick={{ fontSize: 12 }}
            domain={domain} // Dynamic domain from the reusable function
            ticks={ticks}   // Dynamic ticks from the reusable function
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }} 
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#113f67', borderRadius: '8px', padding: '5px' }} 
            itemStyle={{ color: '#113f67' }} 
            labelFormatter={() => ''} 
          />
          <Bar dataKey={datakey} fill="#113f67" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;






