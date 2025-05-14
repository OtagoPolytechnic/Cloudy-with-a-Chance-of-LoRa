const dummyWeatherData = {
  Hourly: [
    { time: "10:00", temperature: 20, humidity: 60, rain: 0.2, wind: 5 },
    { time: "11:00", temperature: 21, humidity: 62, rain: 0.1, wind: 6 },
    { time: "12:00", temperature: 22, humidity: 63, rain: 0, wind: 5.5 },
    { time: "13:00", temperature: 23, humidity: 61, rain: 0.3, wind: 7 },
    { time: "14:00", temperature: 24, humidity: 60, rain: 0.5, wind: 6.5 },
    { time: "15:00", temperature: 25, humidity: 59, rain: 0.4, wind: 6 },
  ],
  "7 Days": [
    { time: "Mon", temperature: 22, humidity: 60, rain: 1.2, wind: 8 },
    { time: "Tue", temperature: 24, humidity: 63, rain: 0.6, wind: 7 },
    { time: "Wed", temperature: 21, humidity: 58, rain: 2.0, wind: 10 },
    { time: "Thu", temperature: 23, humidity: 62, rain: 1.5, wind: 9 },
    { time: "Fri", temperature: 25, humidity: 65, rain: 0.8, wind: 6 },
    { time: "Sat", temperature: 26, humidity: 64, rain: 0.3, wind: 5 },
    { time: "Sun", temperature: 24, humidity: 61, rain: 1.0, wind: 7 },
  ],
  "30 Days": Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    temperature: 20 + Math.random() * 6,
    humidity: 55 + Math.random() * 10,
    rain: Math.random() * 2,
    wind: 5 + Math.random() * 5,
  })),
  Statistics: [
    { time: "Avg", temperature: 23, humidity: 62, rain: 1.1, wind: 7 },
    { time: "Max", temperature: 28, humidity: 68, rain: 2.5, wind: 11 },
    { time: "Min", temperature: 19, humidity: 54, rain: 0.2, wind: 4 },
  ],
};

export default dummyWeatherData;
