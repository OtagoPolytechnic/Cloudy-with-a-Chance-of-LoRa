import { useQuery } from '@tanstack/react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchSensorData = async (key) => {
  const res = await fetch(`${baseUrl}/api/${key}-data`);
  if (!res.ok) throw new Error(`Failed to fetch ${key} data`);
  return res.json();
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

  const isLoading = humidityQuery.isLoading || rainQuery.isLoading || tempQuery.isLoading;

  const error = humidityQuery.error || rainQuery.error || tempQuery.error;

  const latestHumidity = humidityQuery.data?.at(-1)?.humidity ?? null;

  const latestTemperature = tempQuery.data?.at(-1)?.avg_temperature ?? null;

  // Check last 6 rain data points for any rainfall > 0
  const recentRain = rainQuery.data?.slice(-6).some((r) => r.rainfall_mm > 0);
  const rainChance = recentRain ? 'Likely' : 'Unlikely';

  return {
    isLoading,
    error,
    humidity: latestHumidity,
    temperature: latestTemperature,
    rainChance,
  };
};
