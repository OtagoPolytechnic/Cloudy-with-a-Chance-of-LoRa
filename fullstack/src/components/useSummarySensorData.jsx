import { useQuery } from "@tanstack/react-query";

// Base URL for API calls
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Generic function to fetch sensor data based on a key (e.g., 'humidity', 'temperature')
const fetchSensorData = async (key) => {
  const res = await fetch(`${baseUrl}/api/${key}-data`);
  if (!res.ok) throw new Error(`Failed to fetch ${key} data`);
  return res.json();
};

// Estimate humidity if no data is available
const estimateHumidity = (tempC, hasRecentRain) => {
  if (hasRecentRain) return 85;
  if (tempC >= 30) return 35;
  if (tempC >= 22) return 50;
  if (tempC >= 15) return 60;
  if (tempC >= 5) return 70;
  return 80;
};

// Estimate UV index based on time of day, temperature, and recent rain
const estimateUVIndex = (tempC, hasRecentRain) => {
  const hour = new Date().getHours();

  // No UV at night
  if (hour < 6 || hour > 18) return 0;

  let uv = 3; // Base UV level
  if (tempC >= 30) uv = 8;
  else if (tempC >= 22) uv = 6;
  else if (tempC >= 15) uv = 4;
  else if (tempC >= 5) uv = 2;
  else uv = 1;

  // Reduce UV if it recently rained (likely cloudy)
  if (hasRecentRain) uv -= 2;

  return Math.max(0, uv);
};

// Custom hook to fetch and summarize multiple sensor data
export const useSummarySensorData = () => {
  // Fetch latest humidity
  const humidityQuery = useQuery({
    queryKey: ["humidity-latest"],
    queryFn: () => fetchSensorData("humidity"),
    staleTime: 60000,
  });

  // Fetch recent rain data
  const rainQuery = useQuery({
    queryKey: ["rain-recent"],
    queryFn: () => fetchSensorData("rain"),
    staleTime: 60000,
  });

  // Fetch latest temperature
  const tempQuery = useQuery({
    queryKey: ["temperature-latest"],
    queryFn: () => fetchSensorData("temperature"),
    staleTime: 60000,
  });

  // Fetch latest wind speed
  const windQuery = useQuery({
    queryKey: ["wind-latest"],
    queryFn: () => fetchSensorData("wind"),
    staleTime: 60000,
  });

  // Combine loading states
  const isLoading =
    humidityQuery.isLoading ||
    rainQuery.isLoading ||
    tempQuery.isLoading ||
    windQuery.isLoading;

  // Combine errors from all queries
  const error =
    humidityQuery.error ||
    rainQuery.error ||
    tempQuery.error ||
    windQuery.error;

  // Get latest temperature value (fallback to 20°C if unavailable)
  const latestTemperature = tempQuery.data?.at(-1)?.avg_temperature ?? 20;

  // Get latest wind speed (fallback to 0 if unavailable)
  const latestWind = windQuery.data?.at(-1)?.wind_speed ?? 0;

  // Check if it rained in the last 6 records
  const recentRain = rainQuery.data?.slice(-6).some((r) => r.rainfall_mm > 0);
  const rainChance = recentRain ? "Likely" : "Unlikely";

  // Get latest humidity or estimate if missing
  const latestHumidity =
    humidityQuery.data?.at(-1)?.humidity ??
    estimateHumidity(latestTemperature, recentRain);

  // Estimate UV index
  const uvIndex = estimateUVIndex(latestTemperature, recentRain);

  // Return summarized sensor data
  return {
    isLoading,
    error,
    humidity: latestHumidity,
    temperature: latestTemperature,
    rainChance,
    wind: latestWind,
    uvIndex,
  };
};
