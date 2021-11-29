let div2 = document.querySelector("#poke-buttons")
let div3 = document.querySelector("#user-pokemon")
let h1 = document.querySelector("h1")
let h2 = document.querySelector(".title-col") 

let pokemonHealth = 120;
let index = 1

async function getPokeData(id) {

    request = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}` );
    data = await request.json();
    return data;    
}
// <<<<<<<< Section 1 Code >>>>>>>>> //
function createUserSelectionPokemonButton() {
    

    // Generate all buttons for the pokemon
    for(let i=1; i< 50; i++) {  
        let data = getPokeData(index)

        data.then((e)=> {

            buttonDiv = document.createElement('div')
            buttonDiv.classList.add('selection-div')

            let button = document.createElement('input');
                button.type = "image"
                button.src = e.sprites.front_default
                button.classList.add('selection-button')

            let name = document.createElement('h5');
                name.classList.add('text-capitalize')
                name.innerText = e.name

        
        let root = document.querySelector(".root")
    
            
        buttonDiv.appendChild(button) 
        buttonDiv.appendChild(name)      
        root.appendChild(buttonDiv)

        buttonDiv.addEventListener("click", () => {
            navigatePokemonPage(e)
            div3.style.display = "block"
            div2.style.display = "none"
            h1.style.display = "none"
            h2.style.display = "none"
            pokemonHealth = 120;
            
        }) 
 
    })
    index+=3 
    }

}

// <<<<<<< Section 2 >>>>>>>>>> 

function navigatePokemonPage(pokemon) {

    let pokemonPic = document.querySelector(".pokemon-pic")
    pokemonPic.src = pokemon.sprites.other.home.front_shiny
    let pokemonName = document.querySelector(".poke-name")
    pokemonName.innerHTML = pokemon.name
}

function healthMonitor() {
    let peckish = document.querySelector('.peckish');
    let feedme = document.querySelector('.feedme');
    let starving = document.querySelector('.starving');

    let hearts = document.querySelectorAll('.heart')
    if (pokemonHealth < 11) {
        starving.style.display = "none"
    }
    else if(pokemonHealth < 16 ) {    
        hearts[2].src = "/src/img/black-heart.png"
        starving.style.display = "block"
    } else if(pokemonHealth < 31) {    
        hearts[2].src = "/src/img/half-heart.png"
        feedme.style.display = "none"
    } else if(pokemonHealth < 46) {    
        hearts[1].src = "/src/img/black-heart.png"
        feedme.style.display = "block"
    } else if(pokemonHealth < 61) {    
        hearts[1].src = "/src/img/half-heart.png"
        peckish.style.display = "none"
    } else if(pokemonHealth < 76) {    
        hearts[0].src = "/src/img/black-heart.png"
        peckish.style.display = "block"
    } else if(pokemonHealth < 91) {    
        hearts[0].src = "/src/img/half-heart.png"
    } else if (pokemonHealth >91 ) {
        peckish.style.display = "none"
        feedme.style.display = "none"
        starving.style.display = "none"

        hearts.forEach((h) => {
            h.src = "/src/img/red-heart.png"
        })
    }

    pokemonHealth -= 10;
    if(pokemonHealth === 0) {
        clearInterval(heartInterval)
    }
}


function backButton() {

    let button = document.querySelector('.back-button');

    button.addEventListener("click", () => {

        div3.style.display = "none"
        div2.style.display = "block"
        h1.style.display = "block"
        h2.style.display = "block"

    })
}

function feedButton() {

    let button = document.querySelector('.feed-button');
    button.addEventListener("click", ()=> {
        if (pokemonHealth < 120) {
        pokemonHealth +=10
        }
    })
}

createUserSelectionPokemonButton()

let heartInterval = setInterval(healthMonitor, 3500)

backButton()
feedButton()
