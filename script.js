function init() {
    fetchPokemonData();
}

async function fetchPokemonData() {
    let pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=24');
    let pokemonContent = await pokemon.json();
    console.log(pokemonContent);

    let htmlContent = document.getElementById('content');
    let results = pokemonContent.results;

    for (let index = 0; index < results.length; index++) {

        let element = results[index];
        let pokemonDetails = await fetch(element.url);
        let pokemonData = await pokemonDetails.json();
        console.log(pokemonData);

        htmlContent.innerHTML += /*html*/`
        
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
        `

        if (pokemonData.types.length <= 1) {
            document.getElementById(`types${index}`).innerHTML += /*html*/`
            <div class="test2">
            <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span>
            </div>
        `
        } else {
            document.getElementById(`types${index}`).innerHTML += /*html*/`
            <div>
                <div class="test">
                    <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span> 
                    <span class="${pokemonData.types[1].type.name} poke-type-one">${pokemonData.types[1].type.name}</span>
                </div>
            </div>
        `
        }
    }
}

