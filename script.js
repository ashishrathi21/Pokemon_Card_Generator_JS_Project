const typeColors = {
  bug: "#26de81",
  dragon: "#ffea7a",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = " https://pokeapi.co/api/v2/pokemon/";
let card = document.querySelector(".card");
let btn = document.querySelector(".btn");

let getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;

  btn.textContent = "Loading...";
  btn.disabled = true;

  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);

      btn.textContent = "Generate";
      btn.disabled = false;
    });
};

let generateCard = (data) => {
  console.log(data);

  const hp = data.stats[0].base_stat;
  const img = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  const statAttack = data.stats[1].base_stat;
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  const themeColor = typeColors[data.types[0].type.name];

  card.innerHTML = `
    <div class="card-header">
      <div class="hp">HP ${hp}</div>
    </div>
    <!-- Pokémon image overlaps header -->
    <img class="pokemon-img" src=${img} alt="Pokemon">
    <h2 class="name">${pokeName}</h2>
    <div class="types">
    </div>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${statAttack}</div>
        <div>Attack</div>
      </div>
      <div class="stat">
        <div class="stat-value">${statDefence}</div>
        <div>Defense</div>
      </div>
      <div class="stat">
        <div class="stat-value">${statSpeed}</div>
        <div>Speed</div>
      </div>
    </div>
    `;

  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((element) => {
    let span = document.createElement("SPAN");
    span.textContent = element.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

let styleCard = (color) => {
  let cardHeader = document.querySelector(".card-header");
  cardHeader.style.background = color;
};
btn.addEventListener("click", getPokeData);
window.addEventListener("load", generateCard);
