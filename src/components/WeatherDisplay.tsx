
import React, { useEffect, useState } from 'react';
import { WeatherData } from '../types';
import { fetchWeatherData } from '../utils/weatherApi';

interface WeatherDisplayProps {
  onWeatherUpdate: (weatherData: WeatherData) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ onWeatherUpdate }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        // Using fixed coordinates for the example
        // In a real app, you would use geolocation or let the user input coordinates
        const weatherData = await fetchWeatherData(55.7558, 37.6173);
        setWeather(weatherData);
        onWeatherUpdate(weatherData);
      } catch (err) {
        setError('Не удалось загрузить данные о погоде');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [onWeatherUpdate]);

  if (loading) {
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

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium text-red-700 mb-2">Ошибка</h2>
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          onClick={() => window.location.reload()}
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
      <h2 className="text-lg font-medium text-gray-900 mb-2">Метеоданные</h2>
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
    </div>
  );
};

export default WeatherDisplay;
