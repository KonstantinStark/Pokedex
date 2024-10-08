function searchPokemon() {
    let searchTerm = document.getElementById('searchBar').value.toLowerCase();
    if (searchTerm.length < 3) {
        document.getElementById('content').innerHTML = '';
        pokemonArray.forEach((pokemon, index) => {
            document.getElementById('content').innerHTML += generatePokemonCard(pokemon, pokemon, index);
            renderTypes(pokemon, pokemon, index);
        });
        return;
    }

    let filteredPokemon = pokemonArray.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    ).slice(0, 10);

    document.getElementById('content').innerHTML = '';
    filteredPokemon.forEach((pokemon, index) => {
        let originalIndex = pokemonArray.findIndex(p => p.id === pokemon.id);
        document.getElementById('content').innerHTML += generatePokemonCard(pokemon, pokemon, originalIndex);
        renderTypes(pokemon, pokemon, originalIndex);
    });
}