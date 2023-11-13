import React, { useState } from 'react'
import './WeatherApp.css'

import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
export const WeatherApp = () => {
  let api_key="open weather api key";
  const [wicon,setWicon]=useState(cloud);
  
  const search= async ()=>{
    
    const element=document.getElementsByClassName("cityInput");
    console.log(element);
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response =await fetch(url);
    const data=await response.json();
    const humidity=document.getElementsByClassName("humidity-percent");
    const wind=document.getElementsByClassName("wind-rate");
    const temperature=document.getElementsByClassName("weather-temp");
    const location=document.getElementsByClassName("weather-location");
    location[0].innerHTML=data.name;
    temperature[0].innerHTML=Math.floor(data.main.temp)+"&degC";
    
    humidity[0].innerHTML=data.main.humidity+"%";
    wind[0].innerHTML=`${Math.floor(data.wind.speed)} m/sec`;
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setWicon(clear)
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setWicon(cloud)
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setWicon(drizzle)
    }
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setWicon(drizzle)
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setWicon(rain)
    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setWicon(rain)
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setWicon(snow)
    }
    else{
      setWicon(clear)
    }
  }
  function handleSubmit(event){
    event.preventDefault();
    search();
  }
  return (
    
    <div className="container">
      <div className="bg">
        <p>Check weather at any place</p>
      <div >
        <form onSubmit={handleSubmit} className="top-bar">
          <input type="text" className="cityInput" placeholder="Search"/>
          <button className="search-icon"><i class="fa-solid fa-magnifying-glass"></i></button>
          
        </form>
        
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
        <div className="weather-temp"></div>
        <div className="weather-location"></div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="" className="icon" />
            <div className="data" >
              <div className="humidity-percent"></div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data" >
              <div className="wind-rate"></div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
      </div>

  )
}
