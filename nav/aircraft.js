let currentPageUrl = 'https://swapi.dev/api/vehicles/'

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
        
        responseJson.results.forEach((vehicles) => {
            const card = document.createElement('div')
            card.style.backgroundImage = 
            `url("https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg")`
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
            
            const vehiclesNameBG = document.createElement('div')
            vehiclesNameBG.className = 'vehicles-name-bg'

            const vehicleName = document.createElement('span')
            vehicleName.className = 'vehicle-name'
            vehicleName.innerText = `${vehicles.name}`

            vehiclesNameBG.appendChild(vehicleName)
            card.appendChild(vehiclesNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const vehicleImage = document.createElement("div")
                vehicleImage.style.backgroundImage = 
                `url("https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg")`
                vehicleImage.className = "vehicle-image"

                const name = document.createElement ("span")
                name.className = "vehicles-details"
                name.innerText = `Nome: ${vehicles.name}`

                const model = document.createElement ("span")
                model.className = "vehicles-details"
                model.innerText = `Modelo: ${vehicles.model}`

                const passengers = document.createElement ("span")
                passengers.className = "vehicles-details"
                passengers.innerText = `Passageiros: ${vehicles.passengers}`

                const cargoCapacity = document.createElement ("span")
                cargoCapacity.className = "vehicles-details"
                cargoCapacity.innerText = `Capacidade de carga: ${vehicles.cargo_capacity}`

  
                modalContent.appendChild(vehicleImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(passengers)
                modalContent.appendChild(cargoCapacity)

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