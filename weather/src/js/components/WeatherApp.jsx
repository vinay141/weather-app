import React from 'react';
import { Table,td,tr,th,thead,tbody } from 'react-bootstrap';
import { getLocationCoords, getWeatherData } from '../api/weather-api';

export default class WeatherApp extends React.Component {

  constructor() {
    super(); // A call to the class we are extending: React.Component

    this.state = {
      data : {
         forecastList : [],
         city: 'Loading...',
         country: 'Loading...'
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
        this.fetchWeather(this.state.currentUnit);
  }
 
  fetchWeather(units) {
      getLocationCoords().then(
        (coords) => {
          // Got location data, get weather now
          getWeatherData(units, coords).then(
            (data) => {
                this.setState({data:data});
            }, (error) => {
              // Could not get weather data.
              console.error(error);
            }
          );
        }, (error) => {
          // Could not get location data.
          console.error(error);
        }
      );

  }
  render() {
      let lst = this.state.data.forecastList;
      return (
       <div> 
         <div>
            <h1 className="city-name">{this.state.data.city}</h1>
            <h2 className="country">{this.state.data.country}</h2>
          </div>
          <br />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Date \ Time</th>
                <th>00:00 - 03:00</th>
                <th>03:00 - 06:00</th>
                <th>06:00 - 09:00</th>
                <th>09:00 - 12:00</th>
                <th>12:00 - 15:00</th>
                <th>15:00 - 18:00</th>
                <th>18:00 - 21:00</th>
                <th>21:00 - 00:00</th>
              </tr>
            </thead>
             <tbody>
             {
              lst.map( dayData => 
              (
                <tr key= {dayData.date}>
                  <td className="date">
                    {(new Date(dayData.date)).toDateString()}
                  </td>
                    {
                      dayData.list.map( datacol => 
                        (
                          <td key={datacol.ref} >                            
                              <div className="forecast-box" className={ parseInt(datacol.ref)>100 ? "show": "hidden"}>
                                <h3 className="temperature">{datacol.currentTemperature} &#176;{datacol.currentUnit}</h3>
                                <h2 className="weather"><img className="ico" src={datacol.icon} />{datacol.currentWeather}</h2>
                              </div>
                          </td>
                        ))
                      }
                </tr>
              ))}

          </tbody>
        </Table>
      </div>
      );
    }
}