import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState('');

  const handleCityChange = useCallback((city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab78bceb2aaeb41c58454548196c5e9a&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        });
      });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      <WeatherSummary
        city={weatherData.city}
        temp={weatherData.temp}
        icon={weatherData.icon}
        description={weatherData.description}
      />
      <Loader />
    </section>
  );
};

export default WeatherBox;
