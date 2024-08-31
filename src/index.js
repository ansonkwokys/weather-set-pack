import "./styles.css"
import getWeatherData, { LocationDateInput } from "./api.js"
import processSingleDayWeatherData, { SingleDayWeather } from "./process-single-day-weather-data.js"
import messageGenerator, { Message } from "./message-generator.js"
import display from "./display.js"

async function main() {
    try {
        const travelLocationObject = new LocationDateInput("Hong Kong", "2024-08-30", "2024-09-03");
        const travelWeatherData = await getWeatherData(travelLocationObject);
        const currentLocationObject = new LocationDateInput("Toronto", "2024-08-30", "2024-08-30");
        const currentWeatherData = await getWeatherData(currentLocationObject);

        let travelDaysWeather = [];
        for (let i = 0; i < 3; i++){ //adjust date
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

main()
