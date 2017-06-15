import axios from 'axios';

export function getWeatherData(units, coords) {
    return new Promise(function(resolve, reject) {
    
    
    axios.get('http://api.openweathermap.org/data/2.5/forecast',{
        params : {
                units: 'metric',
                lat: coords.lat,
                lon: coords.lon,
                appid: '11ad38fb16a7a484238ba3e7396d2cf6'
            }
        })
        .then(weatherData => {  
            var list = new Array(5);//5days
                
                var periodlist= new Array(8); //8 periods
                var currentHour = (new Date()).getHours();
                var missingCols=  Math.ceil(currentHour / 3)==(currentHour / 3) ? (currentHour / 3) + 1 :Math.ceil(currentHour / 3);
                var col = missingCols ;
                for(var i=0;i<missingCols;i++){
                    periodlist.push({ref:i});
                }
                weatherData.data.list.forEach( wdata => {
                  
                  periodlist.push({
                    currentTemperature: wdata.main.temp,
                    currentWeather: wdata.weather[0].main,
                    currentUnit: 'C',
                    icon: "http://openweathermap.org/img/w/" + wdata.weather[0].icon +".png",
                    ref:wdata.dt_txt
                  });
                  col++;
                  if(col==8){
                    list.push({
                        list : periodlist,
                        date: wdata.dt *1000 //in milliseconds
                    });
                    periodlist = new Array(8);
                    col=0;
                  }
                  
                });
            resolve({
                 forecastList : list,
                 city: weatherData.data.city.name,
                 country: weatherData.data.city.country
            }); 
        })
        .catch(error => { reject(error); });
    });
}

export function getLocationCoords() {
  return new Promise(function(resolve, reject) {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (location) => {
                    resolve({
                        lat: location.coords.latitude,
                        lon: location.coords.longitude
                    });
                },
                (error) => {
                    resolve({
                        lat :51.510357,
                        lon:-0.116773
                    });
                }
            );
        } else {
            //default London data
            resolve({
                lat :51.510357,
                lon:-0.116773
            });
        }
  });
}