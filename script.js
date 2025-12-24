// // Plan d'action
// ICONE METEO
function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";
    return "❓";
}
const villeInput = document.getElementById("meteo-search");
const latInput = document.getElementById("Latitude");
const longInput = document.getElementById("Longitude");
const result = document.getElementById("result");
const geoBtn = document.getElementById("geo-btn");
const form = document.querySelector(".search");
// Ajouter une classe par défaut au chargement
document.body.classList.add("jour");
function displayWeather(villeName, meteo) {
    const temp = meteo.current.temperature_2m;
    const code = meteo.current.weather_code;
    const jour = meteo.current.is_day;
    const icon = getWeatherIcon(code);
    
    result.innerHTML = `
        <h1 class="ville-name">${villeName}</h1>
        <div class="weather-icon">${icon}</div>
        <div class="temperature">${temp}°C</div>
    `;
    document.body.classList.remove("jour", "nuit");
    if (jour === 1) {
        document.body.classList.add("jour");
    } else {
        document.body.classList.add("nuit");
    }
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ville = villeInput.value;
    if (ville === "") return;
    
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1`)
        .then(res => res.json())
        .then(data => {
            if (!data.results) {
                result.innerText = "Ville non trouvée";
                return;
            }
            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;
            latInput.value = latitude;
            longInput.value = longitude;
            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=GMT`
            );
        })
        .then(res => res.json())
        .then(meteo => {
            displayWeather(ville, meteo);
        });
});
geoBtn.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        latInput.value = latitude;
        longInput.value = longitude;
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=GMT`
        )
            .then(res => res.json())
            .then(meteo => {
                displayWeather("Chez moi", meteo);
            });
    });
});