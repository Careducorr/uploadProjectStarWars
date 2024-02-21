let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};


async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar resultados anteriores.
    
    
    try {
        const response = await fetch(url)
        const responseJson = await response.json();
        
        responseJson.results.forEach((planets) => {
            const card = document.createElement('div')
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
            card.className = 'cards'
            card.id = 'backgroundImage'
            
            //function handleImageError() {
            //const div = document.getElementById('backgroundImage');
            //div.innerHTML = "<p>Imagem não encontrada. Texto alternativo aqui.</p>"; // Adiciona texto alternativo
            //div.style.backgroundImage = "none"; // Remove a imagem de fundo
            //div.style.backgroundColor = "#333"; // Cor de fundo alternativa
            //}
            
            // Obtém a referência da imagem
            //const backgroundImage = document.getElementById('backgroundImage');
            
            // Adiciona o evento onerror para lidar com erros de carregamento da imagem
            //backgroundImage.onerror = handleImageError;
            
            const planetsNameBG = document.createElement('div')
            planetsNameBG.className = 'planets-name-bg'

            const planetName = document.createElement('span')
            planetName.className = 'planet-name'
            planetName.innerText = `${planets.name}`

            planetsNameBG.appendChild(planetName)
            card.appendChild(planetsNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
                planetImage.className = "planet-image"

                const name = document.createElement ("span")
                name.className = "planets-details"
                name.innerText = `Nome: ${planets.name}`

                const diameter = document.createElement ("span")
                diameter.className = "planets-details"
                diameter.innerText = `Diametro: ${planets.diameter}`

                const planetsClimate = document.createElement ("span")
                planetsClimate.className = "planets-details"
                planetsClimate.innerText = `Clima: ${planets.climate}`

  
                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(diameter)
                modalContent.appendChild(planetsClimate)
                modalContent.appendChild()
                modalContent.appendChild()

            }

            mainContent.appendChild(card)

        });
        
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"


        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar planetas')
        console.log(error)
        
    }

}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal () {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}


function convertPlanetsClimate(planetsClimate) {
    const climas = {
        arid: 'arido',
        temperete: 'temperada',
        frozen: 'congelado',
        murky: 'obscuro',
        unknown: 'desconhecida',
        tropical: 'tropical'
    };

    return climas[planetsClimate.toLowerCase()] || planetsClimate;
}

//function convertEyeColor(eyeColor) {
    //const cores = {
        //blue: 'azul',
        //brown: 'castanho',
        //green: 'verde',
        //yellow: 'amarelo',
        //black: 'preto',
        //pink: 'rosa',
        //red: 'vermelho',
        //orange: 'laranja',
        //hazel: 'avela',
        //unknown: 'desconhecida'
    //};

   // return cores[eyeColor.toLowerCase()] || eyeColor;
//}


