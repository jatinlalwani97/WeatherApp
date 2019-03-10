let appId="f1a549eb4abaf27131bfe75756d44a1d";
let units="imperial";
let searchmethod;


function getsearchmethod(searchterm){
    if (searchterm.length === 5 && Number.parseInt(searchterm)+ '' === searchterm)
        searchmethod='zip';
    else
        searchmethod='q';
}

function searchweather(searchterm){
    getsearchmethod(searchterm);
     fetch(`http://api.openweathermap.org/data/2.5/weather?${searchmethod}=${searchterm}&APPID=${appId}&units=${units}`).then(result =>{
           return result.json();
           }).then(result => {
            init(result);
        
     })
    
}

function init(resultFromServer){
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        
        default:
            
            break;
    }
    
    
    let weatherdescriptionheader = document.getElementById('weatherdescriptionheader');
    let tempratureelement = document.getElementById('temperature');
    let humdidityelement = document.getElementById('humidity');
    let windspeedelement = document.getElementById('windspeed');
    let cityheader = document.getElementById('cityheader');
    let weathericon = document.getElementById('documenticonimg');
    
    weathericon.src= 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    
    let resultdescription = resultFromServer.weather[0].description;
    weatherdiscriptionheader.innerText = resultdescription.charAt(0).toUpperCase() + resultdescription.slice(1);
    
    tempratureelement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windspeedelement.innerHTML = 'Winds at' + Math.floor(resultFromServer.wind.speed) +'m/s';
    cityheader.innerHTML = resultFromServer.name;
    humdidityelement.innerHTML = 'Humidity levels at' + resultFromServer.main.humidity + '%';
    
    setpositionforweatherinfo();


}

function setpositionforweatherinfo(){
    let weathercontainer = document.getElementById('weathercontainer');
    let weathercontainerheight = weathercontainer.clientHeight;
    let weathercontainerwidth =  weathercontainer.clientWidth;
    weathercontainer.style.left = `calc(50% - ${weathercontainerwidth/2}px)`;
    weathercontainer.style.top = `calc(50% - ${weathercontainerheight/1.3}px)`;
    weathercontainer.style.visibility = 'visible';    
}

document.getElementById('searchbtn').addEventListener('click', () => {
    
    let searchterm = document.getElementById('searchinput').value;
    if(searchterm)
        searchweather(searchterm);

})
                                                     
                                                     
                    