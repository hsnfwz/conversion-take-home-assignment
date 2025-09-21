// STYLES

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = ""; // update with github stylesheet url
document.head.appendChild(link);

// DATA

let pokemons = [];
let isDragging = false;
let startX;
let scrollStart;
let scrollPage = 1;
let numberOfScrollPages = 0;

// FUNCTIONS

const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && drawerContainerElement.classList.contains('open')) {
      if (
        drawerContainerElement.classList.contains('open')
      ) {
        drawerToggleButtonElement.classList.toggle('open');
        drawerContainerElement.classList.toggle('open');
        drawerOverlayElement.classList.toggle('open');
        drawerTogglePageButtonsContainerElement.classList.toggle('open');
      }
    }
  },
  {
    threshold: 1
  }
);
observer.observe(createDrawerSentinel());

async function fetchPokemons() {
  const pokemonIds = [25, 6, 1, 7, 39, 52, 133];

  const responses = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()))

  pokemons = await Promise.all(responses);

  const loaderElement = document.querySelector('#loader');
  loaderElement.remove();

  pokemons.forEach(pokemon => {
    const drawerSliderCardElement = document.createElement('div');
    drawerSliderCardElement.classList.add('drawer-slider-card');

    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const imgElement = document.createElement('img');
    imgElement.src = pokemon.sprites.front_default;
    imgElement.alt = pokemonName;
    imgElement.width = 200;
    imgElement.height = 200;
    imgElement.draggable = false;

    const h1Element = document.createElement('h1');
    h1Element.textContent = pokemonName;

    const spanElement = document.createElement('span');
    spanElement.classList.add('drawer-slider-card-tooltip');
    spanElement.classList.add('wiggle-animation');
    h1Element.appendChild(spanElement);

    const pElement = document.createElement('p');
    pElement.innerHTML = `${pokemonName} has a base experience of ${pokemon.base_experience}, weight of ${pokemon.weight}, and a height of ${pokemon.height}. ${pokemonName} also has ${pokemon.abilities.length} abilities to use to attack or defend against enemy Pokemon.`;

    const buttonElement = document.createElement('button');
    buttonElement.id = pokemonName;
    buttonElement.textContent = "Flip me";
    buttonElement.addEventListener("click", (event) => {
      drawerSliderCardElement.classList.add('flip-animation');
      drawerSliderCardElement.addEventListener("animationend", () => {
        drawerSliderCardElement.classList.remove('flip-animation');
      });
    });

    drawerSliderCardElement.append(imgElement, h1Element, pElement, buttonElement);
    drawerSliderContainerElement.appendChild(drawerSliderCardElement);
  });

  getNumberOfScrollPages();
}

function getNumberOfScrollPages() {
  if (window.innerWidth <= 767) {
    numberOfScrollPages = pokemons.length;
  } else if (window.innerWidth > 767 && window.innerWidth <= 1024) {
    numberOfScrollPages = Math.ceil(pokemons.length / 2);
  } else if (window.innerWidth > 1024) {
    numberOfScrollPages = Math.ceil(pokemons.length / 4);
  }

  if (scrollPage > numberOfScrollPages) {
    scrollPage = numberOfScrollPages
  }

  const drawerTogglePageTextElement = document.querySelector('#drawer-toggle-page-text');
  drawerTogglePageTextElement.textContent = `${scrollPage}/${numberOfScrollPages}`;

  if (scrollPage === 1) {
    drawerTogglePageBackButtonElement.disabled = true;
  } else if (scrollPage === numberOfScrollPages) {
    drawerTogglePageNextButtonElement.disabled = true;
  } else {
    drawerTogglePageNextButtonElement.disabled = false;
    drawerTogglePageBackButtonElement.disabled = false;
  }
}

function createDrawerOverlay() {
  const drawerOverlayElement = document.createElement('div');
  drawerOverlayElement.id = "drawer-overlay";

  return drawerOverlayElement;
}

function createDrawerContainer(drawerToggleContainerElement, drawerSliderContainerElement) {
  const drawerContainerElement = document.createElement('div');
  drawerContainerElement.id = "drawer-container";

  drawerContainerElement.append(drawerToggleContainerElement, drawerSliderContainerElement);

  return drawerContainerElement;
}

function createDrawerToggleContainer(drawerToggleButtonElement, drawerTogglePageButtonsContainerElement) {
  const drawerToggleContainerElement = document.createElement('div');
  drawerToggleContainerElement.id = "drawer-toggle-container";

  drawerToggleContainerElement.append(drawerToggleButtonElement, drawerTogglePageButtonsContainerElement);

  return drawerToggleContainerElement;
}

function createDrawerTogglePageNextButton() {
  const drawerTogglePageNextButtonElement = document.createElement('button');
  drawerTogglePageNextButtonElement.id = "drawer-toggle-page-next-button";

  return drawerTogglePageNextButtonElement;
}

function createDrawerTogglePageBackButton() {
  const drawerTogglePageBackButtonElement = document.createElement('button');
  drawerTogglePageBackButtonElement.id = "drawer-toggle-page-back-button";
  drawerTogglePageBackButtonElement.disabled = true;

  return drawerTogglePageBackButtonElement;
}

function createDrawerTogglePageText() {
  const drawerTogglePageTextElement = document.createElement('div');
  drawerTogglePageTextElement.id = "drawer-toggle-page-text";
  drawerTogglePageTextElement.textContent = `${scrollPage}/${numberOfScrollPages}`;

  return drawerTogglePageTextElement;
}

function createDrawerTogglePageButtons(drawerTogglePageBackButtonElement, drawerTogglePageTextElement, drawerTogglePageNextButtonElement) {
  const drawerTogglePageButtonsContainerElement = document.createElement('div');
  drawerTogglePageButtonsContainerElement.id = "drawer-toggle-page-buttons-container";

  drawerTogglePageButtonsContainerElement.append(drawerTogglePageBackButtonElement, drawerTogglePageTextElement, drawerTogglePageNextButtonElement);

  return drawerTogglePageButtonsContainerElement;
}

function createDrawerToggleButton() {
  const drawerToggleButtonElement = document.createElement('button');
  drawerToggleButtonElement.id = "drawer-toggle-button";
  drawerToggleButtonElement.textContent = "Sticky drawer";

  return drawerToggleButtonElement;
}

function createDrawerSliderContainer() {
  const drawerSliderContainerElement = document.createElement('div');
  drawerSliderContainerElement.id = "drawer-slider-container";

  const loaderElement = document.createElement('div');
  loaderElement.id = "loader";
  loaderElement.textContent = "Fetching Pokemon...";

  drawerSliderContainerElement.appendChild(loaderElement);

  return drawerSliderContainerElement;
}

function createDrawerSentinel() {
  const footer = document.querySelector('footer');
  const drawerSentinelElement = document.createElement('div');
  drawerSentinelElement.id = "drawer-sentinel";
  footer.appendChild(drawerSentinelElement);

  return drawerSentinelElement;
}

// ELEMENTS

const bodyElement = document.querySelector('body');
const drawerOverlayElement = createDrawerOverlay();
const drawerToggleButtonElement = createDrawerToggleButton();
const drawerTogglePageBackButtonElement = createDrawerTogglePageBackButton();
const drawerTogglePageNextButtonElement = createDrawerTogglePageNextButton();
const drawerTogglePageTextElement = createDrawerTogglePageText();
const drawerTogglePageButtonsContainerElement = createDrawerTogglePageButtons(drawerTogglePageBackButtonElement, drawerTogglePageTextElement, drawerTogglePageNextButtonElement);
const drawerToggleContainerElement = createDrawerToggleContainer(drawerToggleButtonElement, drawerTogglePageButtonsContainerElement);
const drawerSliderContainerElement = createDrawerSliderContainer();
const drawerContainerElement = createDrawerContainer(drawerToggleContainerElement, drawerSliderContainerElement);
bodyElement.append(drawerOverlayElement, drawerContainerElement);

// EVENTS

window.addEventListener("resize", () => getNumberOfScrollPages());

drawerTogglePageNextButtonElement.addEventListener("click", (event) => {
  drawerSliderContainerElement.scrollBy({ left: drawerSliderContainerElement.clientWidth - 16, behavior: "smooth" });
  scrollPage = scrollPage + 1;
  if (scrollPage === numberOfScrollPages) {
    drawerTogglePageNextButtonElement.disabled = true;
  } else {
    drawerTogglePageNextButtonElement.disabled = false;
  }

  if (scrollPage !== 1) {
    drawerTogglePageBackButtonElement.disabled = false;
  }

  const drawerTogglePageTextElement = document.querySelector('#drawer-toggle-page-text');
  drawerTogglePageTextElement.textContent = `${scrollPage}/${numberOfScrollPages}`;
});

drawerTogglePageBackButtonElement.addEventListener("click", (event) => {
  drawerSliderContainerElement.scrollBy({ left: -(drawerSliderContainerElement.clientWidth - 16), behavior: "smooth" });
  scrollPage = scrollPage - 1;
  if (scrollPage === 1) {
    drawerTogglePageBackButtonElement.disabled = true;
  } else {
    drawerTogglePageBackButtonElement.disabled = false;
  }

  if (scrollPage !== numberOfScrollPages) {
    drawerTogglePageNextButtonElement.disabled = false;
  }

  const drawerTogglePageTextElement = document.querySelector('#drawer-toggle-page-text');
  drawerTogglePageTextElement.textContent = `${scrollPage}/${numberOfScrollPages}`;
});

drawerSliderContainerElement.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.pageX;
  scrollStart = drawerSliderContainerElement.scrollLeft;
});

drawerSliderContainerElement.addEventListener('mouseup', () => isDragging = false);

drawerSliderContainerElement.addEventListener('mouseleave', () => isDragging = false);

drawerSliderContainerElement.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  drawerSliderContainerElement.scrollLeft = scrollStart - (event.pageX - startX);
});

drawerSliderContainerElement.addEventListener('touchstart', (event) => {
  isDragging = true;
  startX = event.touches[0].pageX;
  scrollStart = drawerSliderContainerElement.scrollLeft;
});

drawerSliderContainerElement.addEventListener('touchmove', (event) => {
  if (!isDragging) return;
  drawerSliderContainerElement.scrollLeft = scrollStart - (event.touches[0].pageX - startX);
});

drawerSliderContainerElement.addEventListener('touchend', () => isDragging = false);

drawerToggleButtonElement.addEventListener("click", (event) => {
  if (pokemons.length === 0) {
    fetchPokemons();
  }
  drawerToggleButtonElement.classList.toggle('open');
  drawerContainerElement.classList.toggle('open');
  drawerOverlayElement.classList.toggle('open');
  drawerTogglePageButtonsContainerElement.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (
    drawerContainerElement.classList.contains('open') &&
    !drawerToggleContainerElement.contains(event.target) &&
    !drawerSliderContainerElement.contains(event.target)
  ) {
    drawerToggleButtonElement.classList.toggle('open');
    drawerContainerElement.classList.toggle('open');
    drawerOverlayElement.classList.toggle('open');
    drawerTogglePageButtonsContainerElement.classList.toggle('open');
  }
});