const apiKey="6e42eb5446cfe81a4f0f5f9c94a05c8a";
const city="San Jose,Camarines Sur,PH";

document.getElementById("date").innerText=new Date().toDateString();

/* WEATHER */

async function getWeather(){

const res=await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);

const data=await res.json();

document.getElementById("temperature").innerText=
Math.round(data.main.temp)+"°C";

document.getElementById("description").innerText=
data.weather[0].description;

document.getElementById("humidity").innerText=
data.main.humidity+"%";

let wind=data.wind.speed*3.6;

document.getElementById("wind").innerText=
wind.toFixed(1)+" km/h";

document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

detectSignal(wind);

}

/* SIGNAL WARNING */

function detectSignal(wind){

let signal=0;

if(wind>=39 && wind<=61) signal=1;
else if(wind>=62 && wind<=88) signal=2;
else if(wind>=89 && wind<=117) signal=3;
else if(wind>=118 && wind<=184) signal=4;
else if(wind>=185) signal=5;

if(signal>0){

document.getElementById("signalWarning").style.display="block";

document.getElementById("signalLevel").innerText=signal;

}

}

/* FORECAST */

async function getForecast(){

const res=await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
);

const data=await res.json();

const container=document.getElementById("forecast");

container.innerHTML="";

for(let i=0;i<7;i++){

let item=data.list[i*8];

let day=document.createElement("div");

day.className="day";

day.innerHTML=`
<p>${new Date(item.dt*1000)
.toLocaleDateString('en-US',{weekday:'short'})}</p>
<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
<p>${Math.round(item.main.temp)}°C</p>
`;

container.appendChild(day);

}

}

/* FORECAST SCROLL */

function moveLeft(){
document.getElementById("forecast").scrollLeft-=120;
}

function moveRight(){
document.getElementById("forecast").scrollLeft+=120;
}

/* START */

getWeather();
getForecast();
