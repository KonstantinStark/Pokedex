let offset = 0;

function init() {
    fetchPokemonData();
    arrowLeft();
    arrowRight();
}

async function fetchPokemonData(offset = 0) {
    let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`);
    let pokemonContent = await pokemon.json();

    let htmlContent = document.getElementById('content');
    let results = pokemonContent.results;

    for (let index = 0; index < results.length; index++) {
        let element = results[index];
        let pokemonDetails = await fetch(element.url);
        let pokemonData = await pokemonDetails.json();

        htmlContent.innerHTML += generatePokemonCard(pokemonData, element, index + offset);
        renderTypes(pokemonData, element, index + offset);
    }
}

function renderTypes(pokemonData, element, index) {
    if (pokemonData.types.length <= 1) {
        document.getElementById(`types${index}`).innerHTML += /*html*/`
        <div class="type-zero">
        <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span>
        </div>
    `
    } else {
        document.getElementById(`types${index}`).innerHTML += /*html*/`
        <div>
            <div class="type-one">
                <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span> 
                <span class="${pokemonData.types[1].type.name} poke-type-one">${pokemonData.types[1].type.name}</span>
            </div>
        </div>
    `
    }
}

async function loadMorePokemon() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('content').classList.add('loading');

    offset += 15;
    await fetchPokemonData(offset);

    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
}


























// Overlay Pokemon
// async function toggleOverlay(index) {
//     let overlayRef = document.getElementById('overlay');
//     overlayRef.classList.toggle('d_none');

//     if (index !== 'end') {

//     }
//     indexNumber = index;
// }

// function arrowLeft() {
//     if (indexNumber <= 0) {
//         indexNumber = myImg.length - 1;
//     } else {
//         indexNumber = indexNumber - 1;
//     }

//     let arrowLeft = document.getElementById('overlay_img');
//     arrowLeft.innerHTML = `<img src="img/${myImg[indexNumber]}">`;
// }

// function arrowRight() {
//     if (indexNumber >= myImg.length - 1) {
//         indexNumber = 0;
//     } else {
//         indexNumber = indexNumber + 1;
//     }

//     let arrowRight = document.getElementById('overlay_img');
//     arrowRight.innerHTML = `<img src="img/${myImg[indexNumber]}">`;
// }


