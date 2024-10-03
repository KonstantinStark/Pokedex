let offset = 0;
let pokemonArray = [];
let currentPokemonIndex = 0;

function init() {
    fetchPokemonData();
    addKeyboardNavigation();
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

        pokemonArray.push(pokemonData);

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
    `;
    } else {
        document.getElementById(`types${index}`).innerHTML += /*html*/`
        <div>
            <div class="type-one">
                <span class="${pokemonData.types[0].type.name} poke-type-zero">${pokemonData.types[0].type.name}</span> 
                <span class="${pokemonData.types[1].type.name} poke-type-one">${pokemonData.types[1].type.name}</span>
            </div>
        </div>
    `;
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

function openOverlay(index) {
    currentPokemonIndex = index;
    updateOverlayContent(currentPokemonIndex);
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('content').classList.add('loading');
    document.querySelector('.load-button').style.display = 'none';
}

function updateOverlayContent(index) {
    let pokemonData = pokemonArray[index];

    document.getElementById('pokemon-name').textContent = pokemonData.name;
    document.getElementById('pokemon-image').src = pokemonData.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemon-height').textContent = `Height: ${pokemonData.height}`;
    document.getElementById('pokemon-weight').textContent = `Weight: ${pokemonData.weight}`;
    document.getElementById('pokemon-type').textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
    document.querySelector('.load-button').style.display = '';
}

function arrowLeft() {
    if (currentPokemonIndex <= 0) {
        currentPokemonIndex = pokemonArray.length - 1;  // 
    } else {
        currentPokemonIndex--;
    }
    updateOverlayContent(currentPokemonIndex);
}

function arrowRight() {
    if (currentPokemonIndex >= pokemonArray.length - 1) {
        currentPokemonIndex = 0;
    } else {
        currentPokemonIndex++
    }
    updateOverlayContent(currentPokemonIndex);
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            arrowLeft();
        } else if (event.key === 'ArrowRight') {
            arrowRight();
        }
    });
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


