import React, { useEffect, useState } from 'react'
import { FiAtSign, FiMoreVertical, FiPlus } from 'react-icons/fi'
import {IoIosChatbubbles, IoMdList,} from 'react-icons/io'
import {FaMehRollingEyes, FaMeh} from 'react-icons/fa'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import ChannelList from '../Channel/ChannelList'
import RecentDms from '../Users/RecentDms'
import SidebarHeader from './SidebarHeader'
import { FaMagnifyingGlass } from "react-icons/fa6"
import Swal from 'sweetalert2'

const Sidebar = ({
  handleOpenNewChannel,
  channels,
  headers,
  handleToggleRender
}) => {
  let navigate = useNavigate()
  let { uid } = useParams()
  const [showChannelList, setShowChannelList] = useState(true)
  const [showRecentDmList, setShowRecentDmList] = useState(true)
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeatherData('Quezon City'); // Replace with your default city
  }, []);

  // Function to fetch weather data
  const fetchWeatherData = async (city) => {
    try {
      const apiKey = 'a4052468c3c49386535b5cc466123a51';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleWeatherSearch = async () => {
    await fetchWeatherData(city);
    setCity(''); // Clear the input field
  };
  

  const displayWeather = () => {
    if (!weatherData) {
      return <div>Loading weather...</div>;
    }

    const { name } = weatherData;
    const { icon, description } = weatherData.weather[0];
    const { temp, humidity } = weatherData.main;
    const { speed } = weatherData.wind;

    return (
      <div className="weather-container">
          <div className='searchBox'>
          <input className='searchInput' 
          type='text' 
          placeholder='search' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleWeatherSearch();
              }
            }}
          />
          <button class="searchButton" onClick={handleWeatherSearch}><FaMagnifyingGlass/>
          </button>
      </div>
      <div className="weather">
        <p>Location: {name}</p>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
        />
        <p>Description: {description}</p>
        <p>Temperature: {Math.round(temp)}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} km/h</p>
      </div>
      </div>
    );
  };

  useEffect(() => {}, [handleToggleRender])
  // Create a function to display list of channels
  const displayChannels = channels
    ? channels.map((channel, index) => {
        return (
          <NavLink to={`${uid}/channels/${channel.id}`} key={index}>
            <ChannelList index={index} 
            name={channel.name} 
            key={index} />
          </NavLink>
        )
      })
    : null

  const staticList = [
    { title: 'Threads', icon: <IoMdList/> },
    { title: 'All DMs', icon: <IoIosChatbubbles /> },
    { title: 'Mentions & Reactions', icon: <FiAtSign /> },
    { title: 'More', icon: <FiMoreVertical /> },
  ]

  const showUnavailableFeatureAlert = (featureName) => {
    Swal.fire({
      icon: 'warning',
      title: 'Feature is still unavailable',
      text: 'Please use other features for now.',
    }).then(() => {
      // After user acknowledges the alert, navigate to the feature
      navigate(`/${uid}/${featureName}`);
    });
  };

  return (
    <nav className="sidebar-container">
      <SidebarHeader />
      <ul className="sidebar-menu">
        {staticList.map((element, index) => {
          return (
            <li className="menu-options" key={index}>
              {element.icon}
              <span
                className="clickable-text"
                onClick={() => showUnavailableFeatureAlert(element.title.toLowerCase())}
              >
                {element.title}
              </span>
            </li>
          );
        })}

        <li className="channels-dropdown">
          <div className="channels-dropdown-header">
            {showChannelList ? (
              <FaMehRollingEyes
                onClick={() => setShowChannelList(!showChannelList)}
              />
            ) : (
              <FaMeh
                onClick={() => setShowChannelList(!showChannelList)}
              />
            )}
            <span>Channels</span>
            <div className="sidebar-add-icon">
              <FiPlus onClick={handleOpenNewChannel} 
              title='channel-add-btn'/>
            </div>
          </div>
          {showChannelList ? (
            <ul className="channels">{displayChannels}</ul>
          ) : null}
        </li>
        <li className="direct-messages-dropdown">
          <div className="direct-messages-dropdown-header">
            {showRecentDmList ? (
              <FaMehRollingEyes
                onClick={() => setShowRecentDmList(!showRecentDmList)}
              />
            ) : (
              <FaMeh
                onClick={() => setShowRecentDmList(!showRecentDmList)}
              />
            )}
            <span>Direct Messages</span>
            <div className="sidebar-add-icon">
              <FiPlus onClick={() => navigate(`/${uid}/new-message`)} />
            </div>
          </div>
          {showRecentDmList ? <RecentDms loginData={headers} /> : null}
        </li>
      </ul>
      {displayWeather()}
    </nav>
  )
}

export default Sidebar
