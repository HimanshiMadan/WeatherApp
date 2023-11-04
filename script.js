const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
}

let searchbar = document.getElementsByTagName("input")[0];

searchbar.addEventListener('keypress', searchQuery);

function searchQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbar.value);
    }
}

async function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.place');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
 
    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);
 
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
 
    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;
 
    let hilow = document.querySelector('.min-max');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    searchbar.value="";
}
 
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
 
    return `${day} ${date} ${month} ${year}`;
}


