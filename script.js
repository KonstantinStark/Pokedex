let offset = 0;
let pokemonArray = [];
let currentPokemonIndex = 0;
let chartInstance = null;

function init() {
    fetchPokemonData();
    addKeyboardNavigation();
    document.getElementById('searchBar').addEventListener('input', searchPokemon);
}