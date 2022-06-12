// Elements from HTML
const searchForm = document.getElementById('search')
const searchInput = document.getElementById('searchInput')

const cityWeather = document.getElementById('city')
const dateWeather = document.getElementById('date')
const imgWeather = document.getElementById('img')
const tempWeather = document.getElementById('temp')
const dayWeather = document.getElementById('day')
const rangeWeather = document.getElementById('range')

const card = document.getElementById('card')
const buttonX = document.getElementById('eliminate')

const API = {
    url : 'https://api.openweathermap.org/data/2.5/weather',
    key : '5d3ec218abdb072dbd8b51bf2171c6df'
}

// Functions

async function search(param){
    try {
        const response = await fetch(`${API.url}?q=${param}&appid=${API.key}&lang=es`)
        const data = await response.json()
        card.style.display = 'block'
        // Modification of HTML
        cityWeather.innerHTML = `${data.name}, ${data.sys.country}`
        dateWeather.innerHTML = new Date().toLocaleDateString();
        tempImg(data)
        tempWeather.innerHTML = `${toCelsius(data.main.temp)}`
        dayWeather.innerHTML = toCapitalize(data)
        rangeWeather.innerHTML = `${toCelsius(data.main.temp_min)}° - ${toCelsius(data.main.temp_max)}°`
    } catch (error) {
        console.log('Hubo un error: ' + error)
    }
}

const onSubmit = (event) => {
    event.preventDefault()
    search(searchInput.value)
}

const onEliminate = (event) => {
    event.preventDefault()
    buttonX.parentElement.style.display = 'none'
}

const tempImg = (data) => {
    const temp = toCelsius(data.main.temp)
    let src = './images/1116453.png'
    if(temp < 18){
        src = './images/Temperature-PNG-Clipart.png'
    }else if(temp > 30){
        src = './images/caliente.png'
    }
    imgWeather.src = src;
}

const toCapitalize = (data) => {
    const capitalized = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    return capitalized;
}

const toCelsius = (kelvin)=> {
    return Math.round(kelvin - 273.15)
}

searchForm.addEventListener('submit', onSubmit, true)


buttonX.addEventListener('click', onEliminate, true)