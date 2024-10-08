function generatePokemonCard(pokemonData, element, index) {
    return `
    <div class="poke-content" onclick="openOverlay(${index})">
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

function generateTypeHTML(pokemonData, index) {
    if (pokemonData.types.length <= 1) {
        return /*html*/`
            <div class="type-zero">
                <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span>
            </div>
        `;
    } else {
        return /*html*/`
            <div>
                <div class="type-one">
                    <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span>
                    <span class="${pokemonData.types[1].type.name} poke-type-one">${pokemonData.types[1].type.name}</span>
                </div>
            </div>
        `;
    }
}