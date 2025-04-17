
import React, { useEffect, useState } from 'react';
import { WeatherData } from '../types';
import { fetchWeatherData, setupWeatherRefresh } from '../utils/weatherApi';
import { useToast } from '@/components/ui/use-toast';

interface WeatherDisplayProps {
  onWeatherUpdate: (weatherData: WeatherData) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ onWeatherUpdate }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { toast } = useToast();

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "Соединение восстановлено",
        description: "Получение актуальных метеоданных...",
      });
      fetchLatestWeather();
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "Нет подключения к интернету",
        description: "Используются сохраненные метеоданные",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const fetchLatestWeather = async () => {
    try {
      setLoading(true);
      // Координаты Москвы (в реальном приложении заменить на геолокацию пользователя)
      const weatherData = await fetchWeatherData(55.7558, 37.6173);
      setWeather(weatherData);
      onWeatherUpdate(weatherData);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить данные о погоде');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Set up initial fetch and refresh interval
  useEffect(() => {
    // Initial fetch
    fetchLatestWeather();

    // Set up refresh interval
    const cleanup = setupWeatherRefresh(55.7558, 37.6173, (data) => {
      setWeather(data);
      onWeatherUpdate(data);
    });

    return cleanup;
  }, [onWeatherUpdate]);

  if (loading && !weather) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Метеоданные</h2>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium text-red-700 mb-2">Ошибка</h2>
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          onClick={fetchLatestWeather}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-900">Метеоданные</h2>
        {isOffline && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Офлайн режим
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500">Температура</p>
          <p className="font-medium">{weather.temperature}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ветер</p>
          <p className="font-medium">{weather.windSpeed} м/с, {weather.windDirection}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Влажность</p>
          <p className="font-medium">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Осадки</p>
          <p className="font-medium">{weather.precipitation} мм</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Видимость</p>
          <p className="font-medium">{weather.visibility}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Давление</p>
          <p className="font-medium">{weather.pressure} гПа</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Состояние</p>
          <p className="font-medium">{weather.conditions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Обновлено</p>
          <p className="font-medium">{new Date(weather.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
      
      <div className="mt-2 text-right">
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          onClick={fetchLatestWeather}
          disabled={loading || isOffline}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Обновление...
            </>
          ) : (
            'Обновить данные'
          )}
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
