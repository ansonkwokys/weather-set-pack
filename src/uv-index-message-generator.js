import { Message } from "./message-generator.js";

export default function uvIndexMessageGenerator(travelDaysWeather = [], messages = []){
    
    function getMaxUvIndex(travelDaysWeather = []){
        let maxUvIndex = 0;
        for (let i = 1; i < travelDaysWeather.length; i++){
            if (travelDaysWeather[i].uvIndex > maxUvIndex){
                maxUvIndex = travelDaysWeather[i].uvIndex;
            }
        }
        return maxUvIndex;
    }

    let message = new Message();
    message.condition = "UV Exposure";
    let maxUvIndex = getMaxUvIndex(travelDaysWeather);
    let shouldAdd = false;
    if (maxUvIndex >= 11){
        message.observation += "Extreme risk of sun exposure.";
        message.recommendations.push("Avoid the sun if possible. Use strong sunscreen, wear a hat, sunglasses, and protective clothing.");
        shouldAdd = true;
    }
    else if (maxUvIndex >= 8){
        message.observation += "Very high risk of sun exposure.";
        message.recommendations.push("Take extra precautions: use sunscreen, wear protective clothing, and stay in shade.");
        shouldAdd = true;
    }
    else if (maxUvIndex >= 6){
        message.observation += "High risk of sun exposure.";
        message.recommendations.push("Apply sunscreen, wear a hat, and seek shade during midday.");
        shouldAdd = true;
    }
    else if (maxUvIndex >= 3){
        message.observation += "Moderate risk of sun exposure.";
        message.recommendations.push("Use sunscreen and wear a hat if outside for long periods.");
        shouldAdd = true;
    }
    if (shouldAdd){
        messages.push(message);
    }
}