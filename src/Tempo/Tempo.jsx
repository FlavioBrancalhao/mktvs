import { useState, useEffect} from 'react'
import axios from 'axios'
import '../App.css'
import WeatherInformations from '../../components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from '../../components/WeatherInformations5Days/WeatherInformations5Days'

function Tempo() {
  const [weather, setWeather] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);


  async function searchCity() {
    const city = 'São bernardo do campo'; // ou use o valor do inputRef se quiser
    const key = '8d716b43af4d6ab6cb01d637e6469d96';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather5Days(apiInfo5Days.data);
      setWeather(apiInfo.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    // Chama a função automaticamente ao montar o componente
    searchCity();
  }, []); // O array vazio faz com que a função seja chamada uma vez quando o componente for montado

  return (
    <div className='container'>
      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default Tempo
