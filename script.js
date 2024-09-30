function init() {
    fetchPokemonData();
}

async function fetchPokemonData() {
    let pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1&offset=0');
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
                <div class="poke-char">
                    <h1>${element.name}</h1>
                    <img class="poke-char-img" src="${pokemonData.sprites.other['official-artwork'].front_default}">
                    <p>${pokemonData[index]}</p>
                </div>
            </div>
        </div>
    `
    }
}

