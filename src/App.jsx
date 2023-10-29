import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'


function App() {

  const [coords, setCoords] = useState()
  // estado donde guardo longitud y latitud (coordenadas)
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  // estado donde guardo los grados Celsius y Fahrenheit
  const [isLoading, setIsLoading] = useState(true)
  // estado para que muestre que la pagina esta cargando


  const APIKEY = 'b687c258a3cd208ca862515b773a745b'

  const success = position => {
    //console.log(position);
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj) // Guardamos en un estado

  }

  useEffect(() => {
    setIsLoading(true)
  navigator.geolocation.getCurrentPosition(success) // API y es asincrono
  }, [])

  //console.log(coords);
  console.log(weather);

  useEffect (() =>{
    if(coords){ // coords existe pero si es undefined no va a entrar, pero si llego la informacion de coord ahi recien se va a ejecutar 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`

    axios.get(url)
    .then(res => {
      const celsius = (res.data.main.temp -273.15).toFixed(1) //toFixed es para que indique cuantos decimales, en este caso (1)
      const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
      setTemp({celsius,fahrenheit})
      setWeather(res.data)
     
    })
    .catch(err => console.log(err))
    .finally (() => setIsLoading(false))
    }
  }, [coords])


  return (
    <div className='app'>
      {
        isLoading
        ? <h2 className='app__loader'>loading...</h2>
        : (
      <WeatherCard
      weather = {weather}
      temp = {temp}
  
      />
  )
      }
    </div>
  )
}

export default App