/* eslint-disable react/prop-types */
import './WeatherInformations.css'

function WeatherInformations({weather}) {
    

    return (
        <div className="">
        <div className="text-title">
        <h2 className="">{weather.name}</h2>
        </div>   
        <div className='weather-container'>
            <h1 className='sub-title'>Hoje esta fazendo:</h1>
            <div className='whather-info'> 
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icone do tempo" className='img-principal' />
            <p className='temperature'>{Math.round(weather.main.temp)}ºC</p>
            </div>
            <p className='description'>{weather.weather[0].description}</p>
            <div className='details'>
                <div className="space">
                <p className="space"> <span className='Text-1'>Sensação térmica:</span> <span className='sen-term'>{Math.round(weather.main.feels_like)}ºC</span></p>
                </div>
                <div className="space">
                <p ><span className="umidade">Umidade:</span> <span className='valor'>{weather.main.humidity}% </span> </p>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default WeatherInformations