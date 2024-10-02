function generatePokemonCard(pokemonData, element, index) {
    return `
    <div class="poke-content">
        <div class="poke-cards">
            <div class="poke-id"><p class="poke-id-text">#${pokemonData.id}</p></div>
            <div class="poke-char">
                <h1>${element.name}</h1> 
                <div class="poke-circle">                   
                    <img class="poke-char-img" src="${pokemonData.sprites.other['official-artwork'].front_default}">
                </div>
            </div>
            <div>
                <p id="types${index}"></p>
            </div>
        </div>
    </div>
    `;
}
