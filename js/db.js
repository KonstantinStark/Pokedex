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

async function loadMorePokemon() {
    const loadButton = document.querySelector('.load-button-style');
    loadButton.style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    document.getElementById('content').classList.add('loading');
    offset += 15;
    await fetchPokemonData(offset);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').classList.remove('loading');
    loadButton.style.display = 'block';
}

function renderTypes(pokemonData, element, index) {
    const typeHTML = generateTypeHTML(pokemonData, index);
    document.getElementById(`types${index}`).innerHTML += typeHTML;
}

function updateOverlayContent(index) {
    let pokemonData = pokemonArray[index];
    updatePokemonDetails(pokemonData);
    updatePokemonStatsChart(pokemonData);
}

function updatePokemonDetails(pokemonData) {
    document.getElementById('pokemonName').textContent = pokemonData.name;
    document.getElementById('pokemonImage').src = pokemonData.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemonHeight').textContent = `Height: ${pokemonData.height} dm`;
    document.getElementById('pokemonWeight').textContent = `Weight: ${pokemonData.weight} hg`;
    document.getElementById('pokemonType').textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
}

function updatePokemonStatsChart(pokemonData) {
    let stats = pokemonData.stats.map(stat => stat.base_stat);
    let statsLabels = pokemonData.stats.map(stat => stat.stat.name);
    if (chartInstance !== null) {
        chartInstance.destroy();
    }
    let ctx = document.getElementById('statsChart').getContext('2d');
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
                x: { beginAtZero: true },
                y: { beginAtZero: true, max: 150 }
            }
        }
    });
}