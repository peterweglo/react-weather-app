import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab78bceb2aaeb41c58454548196c5e9a&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          setWeatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          });
          setPending(false);
        });
      } else {
        setError(true);
        setPending(false);
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {weatherData && !pending && !error && <WeatherSummary {...weatherData} />}
      {pending && <Loader />}
      {error && <ErrorBox children={'There is no such city!'} />}
    </section>
  );
};

export default WeatherBox;
