const poke_container = document.getElementById('poke_container');
const pokemons_number = 300;
const colors = {
    fire: '#ff7f50',
    grass: '#80ff80',
    electric: '#ffff1a',
    water: '#4dd2ff',
    ground: '#ffd480',
    rock: '#d5d5d4', 
    fairy: '#fceaff',
    poison: '#b84dff',
    bug: '#ffd480',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#ccccff',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const main_types = Object.keys(colors);


const fetchPokemons = async () => {
    for(let i=1; i<=pokemons_number; i++){
        await getPokemon(i);
    }
}



const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeapi.glitch.me/v1/pokemon/${pokemon.id}.png">
        </div> 
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3>${name}</h3>
            <smal class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}
