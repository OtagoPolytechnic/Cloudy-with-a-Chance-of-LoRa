/**
 * Function to calculate the Y-axis configuration for a chart
 * @param {Array} data - The dataset used for the chart
 * @param {String} datakey - The key used to extract the values from the data
 * @return {Object} - The Y-axis domain and ticks for the chart
 */
export const calculateYAxisConfig = (data, datakey) => {
    const maxValue = Math.max(...data.map(item => item[datakey]));
    
    const minValue = 0; 
    const range = maxValue - minValue;
    
    
    const tickInterval = Math.ceil(range / 10); // Divides range into equal interval ticks
  
    const adjustedMaxValue = Math.ceil(maxValue / tickInterval) * tickInterval;
  
    const ticks = [];
    for (let i = minValue; i <= adjustedMaxValue; i += tickInterval) {
      ticks.push(i);
    }
  
    return { domain: [minValue, adjustedMaxValue], ticks };
  };
  