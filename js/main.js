

const pokemonsContainer = document.querySelector(".pokemonsContainer")
const headerBtns = document.querySelectorAll(".btnHeader")


let url = "https://pokeapi.co/api/v2/pokemon/"

for(let i = 0; i <= 151; i++) {
    fetch(url + i)
        .then((response) => response.json())
        .then((pokemon) => mostrarPokemons(pokemon))
}
 
function mostrarPokemons(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = 
    `
        <img class="pokemonImg" src="${pokemon.sprites.other["official-artwork"].front_default}">
        <div class="pokemonInfo">
            <span class="pokemonId">#${pokemon.id}</span>
            <span class="pokemonName">${pokemon.name}</span>
        </div>
        <div class="pokemonTypes">
        
        </div>
        <div class="pokemonStats">
            <span class="stat">${pokemon.height}4mt</span>
            <span class="stat">${pokemon.weight}kg</span>
        </div>
    `
    const pokemonTypesContainer = div.querySelector(".pokemonTypes")
    pokemon.types.forEach((type) => {
        const typeSpan = document.createElement("span")
        typeSpan.classList.add("type")
        typeSpan.classList.add(`type-${type.type.name}`)
        typeSpan.innerText = type.type.name
        pokemonTypesContainer.append(typeSpan)
    })
    
    pokemonsContainer.append(div)
}

headerBtns.forEach((boton) => boton.addEventListener("click", (e) => {
    const btnId = e.currentTarget.id;

    pokemonsContainer.innerHTML = "";

    for(let i = 0; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then((data) => {
                if(btnId === "verTodos") {
                    mostrarPokemons(data)
                }
                else {
                    const types = data.types.map((type) => {
                        return type.type.name;
                    })
                    if (types.some(tipo => tipo.includes(btnId))) {
                        mostrarPokemons(data)
                    }
                }
            })
    }
}))