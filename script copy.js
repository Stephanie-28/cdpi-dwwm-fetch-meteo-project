// --- Sélection de tous les éléments HTML utilisés dans le script ---
const cityInput = document.getElementById("meteo-search");
const latInput = document.getElementById("Latitude");
const longInput = document.getElementById("Longitude");
const result = document.getElementById("result");
const go = document.getElementById("go");
const geo = document.getElementById("geo-btn");

// // --- Fonction pour choisir une icône météo simple ---
// // --- Icônes météo ---
// function icone(code) {
//   if (code === 0) return "☀️";
//   if ([1, 2, 3].includes(code)) return "⛅";
//   if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
//   if ([71, 73, 75, 85, 86].includes(code)) return "❄️";
//   if ([95, 96, 99].includes(code)) return "🌩️";
//   return "🌫️";
// }

// // --- Change le fond selon jour/nuit ---
// // --- Fond jour/nuit ---
// function fond(jour) {
//   document.body.classList.toggle("jour", jour);
//   document.body.classList.toggle("nuit", !jour);
// }



function main() {
  // --- Fonction principale ---
  // --- Affichage météo ---
  async function meteo(latitude, longitude, nom = "Ici") {
    const responseMeteo = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const dataMeteo = await responseMeteo.json();

    const weather = dataMeteo.current_weather;
    fond(weather.is_day);

    result.textContent = `${icone(weather.weathercode)} ${nom} : ${
      weather.temperature
    }°C`;
  }
}
main();

// // --- Quand on tape une ville ---
// go.onclick = async () => {
//   if (!cityInput.value) return result.textContent = "Entrez une ville !";

//   const responseVille = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput.value}&count=1`);
//   const dataVille = await responseVille.json();

//   if (!dataVille.results) return result.textContent = "Ville introuvable";

//   const { latitude, longitude, name } = dataVille.results[0];
//   latInput.value = latitude.toFixed(2);
//   longInput.value = longitude.toFixed(2);

//   meteo(latitude, longitude, name);
// };

// // --- Quand on clique sur “ma position” ---
// geo.onclick = () => navigator.geolocation.getCurrentPosition(async (position) => {
//   latInput.value = position.coords.latitude.toFixed(2);
//   longInput.value = position.coords.longitude.toFixed(2);

//   const responseInverse = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latInput.value}&longitude=${longInput.value}`);
//   const dataInverse = await responseInverse.json();

//   const name = dataInverse.results?.[0]?.name || "Ici";
//   cityInput.value = name;

//   meteo(latInput.value, longInput.value, name);
// });

// main();

// /**
//  * S'exécute quand l'utilisateur a accepté la géolocalisation.

// */
// function onPosition(position_obj) {
//   const latitude = position_obj.coords.latitude;
//   const longitude = position_obj.coords.longitude;

//   document.getElementById("Latitude").value = latitude;
//   document.getElementById("Longitude").value = longitude;
// }
// // Quand on clique sur le bouton "Je suis juste là !!!"

// ******

// // --- Tableau global pour stocker les données météo ---
// let allMeteos = [];

// fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m")
// .then(res => res.json())
// .then(data => {
//   allMeteos = data;
//   console.log("Météo reçue :", allMeteos);

// });
// // clic sur le bouton
// go.addEventListener('click', () => {
//   console.log("Bouton cliqué !");
// });

// console.log("Hello meteo !");

// *****************************

// // 1. récupére les valeurs de la latitude et de la longitude.
// navigator.geolocation.getCurrentPosition((position_obj) => {
//   const latitude = position_obj.coords.latitude;

//     // appeller ()
//     // passer en paramètre (...)
//   const longitude = position_obj.coords.longitude;

//   console.log( position_obj );

//   // 2. affiche les résultats de la latitude et de la longitude.
//   fetch(
//     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day,weather_code,temperature_2m&timezone=GMT`
//   )
//     .then((res) => res.json())
//     .then((meteo_obj) => {
//       console.log(meteo_obj);
//       const temperature = meteo_obj.current.temperature_2m;
//       // 3. puis affiche les temperatures de l'api grâce au Current Weather
//       console.log(temperature);

//       // X. Afficher la température à l'écran.
//       const temperature_elem = document.querySelector(".temperature");
//       console.log(temperature_elem);
//       temperature_elem.innerText = temperature;
//     });
// });

// // affiche les temperatures des villes ecrit dans les input

// const cityInput =    document.getElementById( "meteo-search" );

// cityInput.addEventListener("change",onInputChange);

// const latInput = document.getElementById("Latitude");
// const longInput = document.getElementById("Longitude");

// function onInputChange() {
//     // 1. Affecter le nom de la ville à une variable


//     // 2. Appeller la fonction fetch geocoding pour affecter latitude et longitude

//         // 3. Appeller la fonction fetch forecast et lui passer la latitude et la longitude 
//         // // pour affecter la variable meteo

//             // 4. J'affiche la temperature à l'ecran en affectant la variable temperature_2m à la variable innerText
// }