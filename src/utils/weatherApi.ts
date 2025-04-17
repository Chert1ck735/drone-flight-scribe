
import { WeatherData } from '../types';

const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with actual API key
const CACHE_KEY = 'cached_weather_data';
const CACHE_TIMESTAMP_KEY = 'cached_weather_timestamp';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

// Function to fetch from API
const fetchFromApi = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error: ' + response.statusText);
    }
    
    const data = await response.json();
    
    // Map OpenWeatherMap response to our WeatherData structure
    const weatherData: WeatherData = {
      temperature: Math.round(data.main.temp),
      windSpeed: Math.round(data.wind.speed),
      windDirection: getWindDirection(data.wind.deg),
      humidity: data.main.humidity,
      precipitation: data.rain ? data.rain['1h'] || 0 : 0,
      visibility: getVisibilityDescription(data.visibility),
      pressure: data.main.pressure,
      conditions: data.weather[0].description,
      timestamp: new Date().toISOString(),
    };
    
    // Cache the data
    localStorage.setItem(CACHE_KEY, JSON.stringify(weatherData));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Helper function to convert wind degrees to direction
const getWindDirection = (degrees: number): string => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

// Helper function to get visibility description in Russian
const getVisibilityDescription = (visibilityMeters: number): string => {
  if (visibilityMeters >= 10000) return 'Отличная';
  if (visibilityMeters >= 5000) return 'Хорошая';
  if (visibilityMeters >= 2000) return 'Средняя';
  return 'Плохая';
};

// Function to get cached data if it exists and is not expired
const getCachedData = (): WeatherData | null => {
  try {
    const cachedTimestampStr = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const cachedDataStr = localStorage.getItem(CACHE_KEY);
    
    if (!cachedTimestampStr || !cachedDataStr) {
      return null;
    }
    
    const cachedTimestamp = parseInt(cachedTimestampStr);
    const now = Date.now();
    
    // For development testing, always return cached data
    // In production, check if the cache is expired
    // if (now - cachedTimestamp > CACHE_EXPIRY) {
    //   return null;
    // }
    
    return JSON.parse(cachedDataStr) as WeatherData;
  } catch (error) {
    console.error('Error getting cached weather data:', error);
    return null;
  }
};

// Generate mock data if both API and cache fail
const generateMockData = (): WeatherData => {
  return {
    temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
    windSpeed: Math.floor(Math.random() * 10) + 2, // 2-12 m/s
    windDirection: ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'][Math.floor(Math.random() * 8)],
    humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
    precipitation: Math.random() * 5, // 0-5 mm
    visibility: ['Отличная', 'Хорошая', 'Средняя', 'Плохая'][Math.floor(Math.random() * 4)],
    pressure: Math.floor(Math.random() * 30) + 990, // 990-1020 hPa
    conditions: ['Ясно', 'Переменная облачность', 'Облачно', 'Пасмурно'][Math.floor(Math.random() * 4)],
    timestamp: new Date().toISOString(),
  };
};

// The main function that will be called by components
export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  // First, check for cached data
  const cachedData = getCachedData();
  
  // Check if we're online
  if (navigator.onLine) {
    try {
      // Try to fetch fresh data
      const freshData = await fetchFromApi(latitude, longitude);
      return freshData;
    } catch (error) {
      console.warn('Failed to fetch fresh weather data. Using cached data.', error);
      // If API call fails but we have cached data, use it
      if (cachedData) {
        return cachedData;
      }
      // If all else fails, return mock data
      return generateMockData();
    }
  } else {
    console.warn('Offline mode. Using cached weather data.');
    // If offline but we have cached data, use it
    if (cachedData) {
      return cachedData;
    }
    // If offline and no cache, return mock data
    return generateMockData();
  }
};

// Function to auto-refresh weather data in the background (call this on app init)
export const setupWeatherRefresh = (latitude: number, longitude: number, onUpdate: (data: WeatherData) => void) => {
  const refreshWeather = async () => {
    if (navigator.onLine) {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        onUpdate(data);
      } catch (error) {
        console.error('Auto-refresh weather error:', error);
      }
    }
  };
  
  // Refresh immediately
  refreshWeather();
  
  // Then refresh every 5 minutes
  const intervalId = setInterval(refreshWeather, CACHE_EXPIRY);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
