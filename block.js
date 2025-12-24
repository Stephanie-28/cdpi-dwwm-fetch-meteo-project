// --- Quand on change manuellement latitude/longitude ---
[latInput, longInput].forEach(input => {
  input.addEventListener("change", async () => {
    if (latInput.value && longInput.value) {
      const responseInverse = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latInput.value}&longitude=${longInput.value}`);
      const dataInverse = await responseInverse.json();

      const name = dataInverse.results?.[0]?.name || "Lieu inconnu";
      cityInput.value = name;

      meteo(latInput.value, longInput.value, name);
    }
  });
});