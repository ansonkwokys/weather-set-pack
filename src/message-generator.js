import tempMessageGenerator from "./temp-message-generator.js";
import precipMessageGenerator from "./precip-message-generator.js";
import uvIndexMessageGenerator from "./uv-index-message-generator.js";

export class Message {
    condition;
    observation;
    recommendations;

    constructor() {
        this.condition = "";
        this.observation = "";
        this.recommendations = [];
    }
}

export default function messageGenerator(currentWeather, travelDaysWeather = []){
    const newCity = travelDaysWeather[0].address.split(',')[0];
    const currentCity = currentWeather.address.split(',')[0];
    const messages = [];

    tempMessageGenerator(currentWeather, travelDaysWeather, messages, newCity, currentCity);
    precipMessageGenerator(travelDaysWeather, messages);
    uvIndexMessageGenerator(travelDaysWeather, messages);

    return messages;
}


