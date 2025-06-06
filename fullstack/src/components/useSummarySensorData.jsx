import { useQuery } from '@tanstack/react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchSensorData = async (key) => {
  const res = await fetch(`${baseUrl}/api/${key}-data`);
  if (!res.ok) throw new Error(`Failed to fetch ${key} data`);
  return res.json();
};

// Estimate humidity based on temperature and rain
const estimateHumidity = (tempC, hasRecentRain) => {
  if (hasRecentRain) return 85;
  if (tempC >= 30) return 35;
  if (tempC >= 22) return 50;
  if (tempC >= 15) return 60;
  if (tempC >= 5) return 70;
  return 80;
};

// Estimate UV Index based on time, temperature, and cloudiness
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

  if (hasRecentRain) uv -= 2; // Clouds reduce UV

  return Math.max(0, uv);
};

export const useSummarySensorData = () => {
  const humidityQuery = useQuery({
    queryKey: ['humidity-latest'],
    queryFn: () => fetchSensorData('humidity'),
    staleTime: 60000,
  });

  const rainQuery = useQuery({
    queryKey: ['rain-recent'],
    queryFn: () => fetchSensorData('rain'),
    staleTime: 60000,
  });

  const tempQuery = useQuery({
    queryKey: ['temperature-latest'],
    queryFn: () => fetchSensorData('temperature'),
    staleTime: 60000,
  });

  const windQuery = useQuery({
    queryKey: ['wind-latest'],
    queryFn: () => fetchSensorData('wind'),
    staleTime: 60000,
  });

  const isLoading =
    humidityQuery.isLoading ||
    rainQuery.isLoading ||
    tempQuery.isLoading ||
    windQuery.isLoading;

  const error =
    humidityQuery.error ||
    rainQuery.error ||
    tempQuery.error ||
    windQuery.error;

  const latestTemperature = tempQuery.data?.at(-1)?.avg_temperature ?? 20;
  const latestWind = windQuery.data?.at(-1)?.wind_speed ?? 0;

  const recentRain = rainQuery.data?.slice(-6).some((r) => r.rainfall_mm > 0);
  const rainChance = recentRain ? 'Likely' : 'Unlikely';

  const latestHumidity =
    humidityQuery.data?.at(-1)?.humidity ??
    estimateHumidity(latestTemperature, recentRain);

  const uvIndex = estimateUVIndex(latestTemperature, recentRain);

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
