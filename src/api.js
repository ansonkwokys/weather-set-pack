export default getWeatherData;

export class LocationDateInput{
    location;
    startDate;
    endDate;
    constructor(location, startDate, endDate){
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    getLocation(){
        return this.location;
    }
    getStartDate(){
        return this.startDate;
    }
    getEndDate(){
        return this.endDate;
    }
};


async function getWeatherData(locationObject){
    const location = locationObject.getLocation();
    const startDate = locationObject.getStartDate();
    const endDate = locationObject.getEndDate();
    const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
    let url;
    const apiKey = process.env.apiKey;
    if (startDate && endDate) {
        url = `${baseUrl}/${location}/${startDate}/${endDate}?unitGroup=metric&key=${process.env.apiKey}`; //will fix the unit problem later
    
    }
    else {
        url = `${baseUrl}/${location}?key=${process.env.apiKey}`
    }
    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok){
            throw new Error(`Error ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}