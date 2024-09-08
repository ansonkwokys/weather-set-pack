import "./styles.css"
import getWeatherData, { LocationDateInput } from "./api.js"
import processSingleDayWeatherData, { SingleDayWeather } from "./process-single-day-weather-data.js"
import messageGenerator, { Message } from "./message-generator.js"
import display from "./display.js"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("form-1");
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            main();
        });
    } else {
        console.error("Form not found");
    }
});

async function main() {
    function calculateDaysTraveled(date1, date2) {
        const startDate = new Date(date1);
        const endDate = new Date(date2);
        const timeDifference = endDate - startDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return Math.round(daysDifference) + 1;
    }
    console.log("hello")
    const form = document.getElementById("form-1");
    if (!form) {
        console.error("Form not found");
        return;
    }
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)

    const daysTraveled = calculateDaysTraveled(data['date-from'], data['date-to']);
    console.log(daysTraveled);

    // Uncomment the following block when you're ready to use it
    
    try {
        const travelLocationObject = new LocationDateInput(data['location-to'], data['date-from'], data['date-to']);
        const travelWeatherData = await getWeatherData(travelLocationObject);
        const currentLocationObject = new LocationDateInput(data['location-from'], formattedDate, formattedDate);
        const currentWeatherData = await getWeatherData(currentLocationObject);

        let travelDaysWeather = [];
        for (let i = 0; i < daysTraveled; i++){
            travelDaysWeather.push(new SingleDayWeather(i));
            processSingleDayWeatherData(travelDaysWeather[i], travelWeatherData);
            console.log(travelDaysWeather[i])
        }

        let currentWeather = new SingleDayWeather(0);
        processSingleDayWeatherData(currentWeather, currentWeatherData);
        console.log(currentWeather);

        let messages = messageGenerator(currentWeather, travelDaysWeather);
        console.log(messages)

        display(currentWeather, travelDaysWeather, messages)
    }
    catch (error){
        console.error("An error occurred: ", error);
    }
    
}