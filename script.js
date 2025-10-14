// --- Sélection de tous les éléments HTML utilisés dans le script ---

const cityInput = document.getElementById("meteo-search");
const latInput = document.getElementById("Latitude");
const longInput = document.getElementById("Longitude");
const result = document.getElementById("result");

// --- Tableau global pour stocker tout les températures  ---
let allMeteos = [];

fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m").then((res) => res.json())
.then((data) => {
    allMeteos = data; // On sauvegarde la liste dans notre variable globale
    afficherListe(allMeteos); // Et on affiche toutes les Meteos sur la page

console.log();






    
})



function main(){
    const inputs = document.querySelectorAll('#meteo-search, #Latitude, #Longitude');
    
    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const value = event.target.value;
            // Met à jour tous les autres inputs
            inputs.forEach(input => {
                if (input !== event.target) input.value = value;
            });
        });
    });
    
    console.log("Hello meteo !");
}
main();

/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 * 
 * @param {*} position_obj 
 */
function onPosition(position_obj){
    const latitude = position_obj.coords.latitude;
    const longitude = position_obj.coords.longitude;

    document.querySelector(".latitude").innerText = latitude;
    document.querySelector(".longitude").innerText = longitude;

}

