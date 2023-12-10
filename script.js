
let date = (new Date()).toLocaleDateString();	

let weather = {
    "apikey":"5bcd7cfd3f6f8f71806d722270b8ec36",//permet d'enregistrer la clé d'API
	fetchWeather : function (city,lang) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city //Demande a l'API la ville
	    + "&units=metric&lang="
		+ lang
		+ "&appid="
        + this.apikey)//demande à cette API
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;// Permet de donné la donné du nom de la ville a name
        const { icon, description } = data.weather[0];// permet de donné la donné à l'icon et la description du temps
        const { temp, humidity } = data.main;// Permet de donné la donné au temps et l'humidité 
        const { speed } = data.wind; // Permet de donné la donné de la force du vent
        document.querySelector(".city").innerText = "Météo dans " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidité: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vitesse du vent: " + speed + " km/h";
		document.querySelector(".auj").innerText = date;
    },
}

function timer(){
fetch("config.json")
      .then(res => res.json())
      .then(json => {
		const city = json.city;
		const lang = json.lang;
        weather.fetchWeather(city,lang);
      });
}

timer();
setInterval(timer(), 3600000);
