/* eslint-disable react/prop-types */
import "./WeatherInformations5Days.css";

function WeatherInformations5Days({ weather5Days }) {
  console.log(weather5Days);

  let dailyForecast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });

    return newDate;
  }

  return (
    <div className="weather-container-2">
      <h3>Previsão dos próximos 5 Dias</h3>
      <div className="weather-list">
        {next5DaysForecast.map((forecast) => (
          <div key={forecast.dt} className="weather-item">
            <p className="forecast-day">{convertDate(forecast)}</p>
            <img
            className="img-2"
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt="icone do tempo"
            />
            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>
            <p className="text-min-max">
            Min: {Math.round(forecast.main.temp_min)}ºC  / {" "}
            Máx: {Math.round(forecast.main.temp_max)}ºC 
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5Days;
