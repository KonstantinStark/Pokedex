function searchPokemon() {
    let searchTerm = document.getElementById('searchBar').value.toLowerCase();
    let content = document.getElementById('content');
    let mainContainer = document.querySelector('.main-container');
    if (searchTerm.length < 3) {
        content.innerHTML = '';
        pokemonArray.forEach((pokemon, index) => {
            content.innerHTML += generatePokemonCard(pokemon, pokemon, index);
            renderTypes(pokemon, pokemon, index);
        });
        mainContainer.style.height = 'auto';
        return;
    }
    let filteredPokemon = pokemonArray.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    ).slice(0, 10);
    content.innerHTML = '';
    handleFilteredPokemon(filteredPokemon);
}

function handleFilteredPokemon(filteredPokemon) {
    const mainContainer = document.querySelector('.main-container');
    document.getElementById('content').innerHTML = '';
    if (filteredPokemon.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results';
        noResultsMessage.textContent = 'no Pokémon found';
        document.getElementById('content').appendChild(noResultsMessage);
        mainContainer.style.height = '100vh';
    } else {
        mainContainer.style.height = '100vh';
        filteredPokemon.forEach((pokemon) => {
            let originalIndex = pokemonArray.findIndex(p => p.id === pokemon.id);
            document.getElementById('content').innerHTML += generatePokemonCard(pokemon, pokemon, originalIndex);
            renderTypes(pokemon, pokemon, originalIndex);
        });
    }
}