function arrowLeft() {
    if (currentPokemonIndex <= 0) {
        currentPokemonIndex = pokemonArray.length - 1;
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
        } else if (event.key === 'Escape') {
            closeOverlay();
        }
    });
}

function openOverlay(index) {
    currentPokemonIndex = index;
    updateOverlayContent(currentPokemonIndex);
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('content').classList.add('loading');
    document.querySelector('.load-button').style.display = 'none';
    document.body.classList.add('no-scroll');
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
    document.querySelector('.load-button').style.display = '';
    document.body.classList.remove('no-scroll');
}

async function loadMorePokemon() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('content').classList.add('loading');

    offset += 15;
    await fetchPokemonData(offset);

    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
}