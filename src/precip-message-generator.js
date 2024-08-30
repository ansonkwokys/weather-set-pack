import { Message } from "./message-generator.js";

export default function precipMessageGenerator(travelDaysWeather = [], messages = []){

    function getPrecipType(condition){
        for (let i = 1; i < travelDaysWeather.length; i++){
            if (travelDaysWeather[i].precipType.includes(condition)){
                return true;
            }
        }
        return false;
    }
    function getMaxProb(travelDaysWeather = []){
        let maxProb = 0;
        for (let i = 1; i < travelDaysWeather.length; i++){
            if (travelDaysWeather[i].precipProb > maxProb){
                maxProb = travelDaysWeather[i].precipProb;
            }
        }
        return maxProb;
    }

    let message = new Message();
    message.condition = "Precipitation"
    if (getPrecipType("snow")){
        let shouldAdd = false;
        let maxProb = getMaxProb(travelDaysWeather);
        if (maxProb > 90){
            message.observation += "Expect heavy snow, it's almost certain.";
            message.recommendations.push("Prepare for snow with a heavy coat, insulated boots, and gloves.");
            shouldAdd = true;
        }
        else if (maxProb > 70){
            message.observation += "Snow is likely, so be prepared.";
            message.recommendations.push("Bring a waterproof coat and consider snow boots.");
            shouldAdd = true;
        }
        else if (maxProb > 30){
            message.observation += "There's a slight chance of snow.";
            message.recommendations.push("Pack a warm jacket, just in case.");
            shouldAdd = true;
        }
        if (shouldAdd) {
            messages.append(message);
        }
    }

    else if (getPrecipType("rain")){
        let shouldAdd = false;
        let maxProb = getMaxProb(travelDaysWeather);
        if (maxProb > 90){
            message.observation += "Expect heavy rain, it's almost certain.";
            message.recommendations.push("Prepare for rain with a waterproof coat, umbrella, and waterproof shoes.");
            shouldAdd = true;
        }
        else if (maxProb > 70){
            message.observation += "Rain is likely, so be prepared.";
            message.recommendations.push("Bring a raincoat and consider packing an umbrella.");
            shouldAdd = true;
        }
        else if (maxProb > 30){
            message.observation += "There's a slight chance of rain.";
            message.recommendations.push("Pack a light rain jacket, just in case.");
            shouldAdd = true;
        }
        if (shouldAdd) {
            messages.push(message);
        }
    }
}