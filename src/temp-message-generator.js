import { Message } from "./message-generator.js";


export default function tempMessageGenerator(currentWeather, travelDaysWeather = [], 
    messages = [], newCity, currentCity){

    function avgTempCalculator(travelDaysWeather = []){
        let tempSum = 0;
        for (let i = 0; i < travelDaysWeather.length; i++){
            tempSum += travelDaysWeather[i].temp;
        }
        return tempSum/travelDaysWeather.length;
    }

    let message = new Message();
    message.condition = "Temperature"
    let currentTemp = currentWeather.temp;
    let travelAvgTemp = avgTempCalculator(travelDaysWeather);
    let tempDiff = travelAvgTemp - currentTemp;
    
    //temp diff
    if (tempDiff <= 3 && tempDiff >= -3){
        message.observation += `Looks like the temperature in ${newCity} will pretty much be the same as where you are now.`;
        message.recommendations.push("Pack as you normally would.");
    } else {
        if (tempDiff > 0){
            message.observation += `The temperature in ${newCity} will be ${Math.round(tempDiff)}°C warmer than ${currentCity}.`;
            message.recommendations.push("Pack light clothing.");
        }
        else {
            message.observation += `The temperature in ${newCity} will be ${ -1 * Math.round(tempDiff)}°C colder than ${currentCity}.`;
            message.recommendations.push("Pack more layers.");
        }
    }

    //extreme weather
    if (travelAvgTemp >= 25){
        message.observation += " It'll be really hot out there!";
        message.recommendations.push("Stay prepared for the heat.");
    }
    if (travelAvgTemp <= 5){
        message.observation += " It'll be really cold out there!";
        message.recommendations.push("Stay prepared for the cold.");
    }

    messages.push(message);

}