
import { WeatherData } from '../types';

// Mock function to simulate fetching weather data from an API
export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  // In a real application, this would be an actual API call
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
        windSpeed: Math.floor(Math.random() * 10) + 2, // 2-12 m/s
        windDirection: ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'][Math.floor(Math.random() * 8)],
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        precipitation: Math.random() * 5, // 0-5 mm
        visibility: ['Отличная', 'Хорошая', 'Средняя', 'Плохая'][Math.floor(Math.random() * 4)],
        pressure: Math.floor(Math.random() * 30) + 990, // 990-1020 hPa
        conditions: ['Ясно', 'Переменная облачность', 'Облачно', 'Пасмурно'][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
      });
    }, 500);
  });
};
