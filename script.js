let offset = 0;
let pokemonArray = [];
let currentPokemonIndex = 0;
let chartInstance = null;

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

function searchPokemon() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();

    // Wenn weniger als 3 Buchstaben eingegeben wurden, zeige alle Pokémon wieder an
    if (searchTerm.length < 3) {
        document.getElementById('content').innerHTML = '';
        pokemonArray.forEach((pokemon, index) => {
            document.getElementById('content').innerHTML += generatePokemonCard(pokemon, pokemon, index);
            renderTypes(pokemon, pokemon, index);
        });
        return; // Beende die Funktion hier
    }

    // Filtere die Pokémon nach Namen, wenn 3 oder mehr Buchstaben eingegeben wurden
    const filteredPokemon = pokemonArray.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Zeige maximal 10 Pokémon an

    // Leere den Inhalt und füge die gefilterten Pokémon hinzu
    document.getElementById('content').innerHTML = '';
    filteredPokemon.forEach((pokemon, index) => {
        // Hier wird der korrekte Index aus pokemonArray verwendet
        const originalIndex = pokemonArray.findIndex(p => p.id === pokemon.id);
        document.getElementById('content').innerHTML += generatePokemonCard(pokemon, pokemon, originalIndex);
        renderTypes(pokemon, pokemon, originalIndex);
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

function updateOverlayContent(index) {
    let pokemonData = pokemonArray[index];

    document.getElementById('pokemon-name').textContent = pokemonData.name;
    document.getElementById('pokemon-image').src = pokemonData.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemon-height').textContent = `Height: ${pokemonData.height}`;
    document.getElementById('pokemon-weight').textContent = `Weight: ${pokemonData.weight}`;
    document.getElementById('pokemon-type').textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

    setTimeout(() => {
        const stats = pokemonData.stats.map(stat => stat.base_stat);
        const statsLabels = pokemonData.stats.map(stat => stat.stat.name);

        if (chartInstance !== null) {
            chartInstance.destroy();
        }

        const ctx = document.getElementById('statsChart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statsLabels,
                datasets: [{
                    label: 'Pokemon Stats',
                    data: stats,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true,
                        max: 150
                    }
                }
            }
        });
    }, 100);
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
    document.querySelector('.load-button').style.display = '';
    document.body.classList.remove('no-scroll');
}

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

// Event-Listener für die Suchfunktion
document.getElementById('searchInput').addEventListener('input', searchPokemon);

// Initialisiere die Seite
init();
