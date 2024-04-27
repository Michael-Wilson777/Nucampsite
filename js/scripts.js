console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {

    if (faIcon.classList.contains('fa-pause')) {

        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();

    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
}) 

async function fetchWeather() {
   
   try{

    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "North Branford";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    displayWeather(data)

   } catch (error) {
    
    console.error(`There was an error fetching weather data`, error);

   }
}
fetchWeather()


function displayWeather(data) {

    const temp = data.main.temp;
    document.querySelector('#weather-temp').textContent = `${Math.round(temp)}\u00B0`;

    const weatherDescription = document.querySelector('#weather-description');
    weatherDescription.textContent = data.weather[0].description; 

    const image = document.createElement('img');
    image.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const currentWeather = document.querySelector('#weather-icon');
    
    currentWeather.appendChild(image);
}