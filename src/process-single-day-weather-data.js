export default processSingleDayWeatherData;
export class SingleDayWeather{
    index;
    address;
    tzoffset;
    dateTime;
    dateTimeEpoch;
    temp;
    tempMax;
    tempMin;
    feelsLike;
    description;
    icon;
    precipProb;
    precipType;
    humidity;
    uvIndex;
    windSpeed;  
    cloudCover; //in percentage
    visibility; //in km
    
    constructor(i){
        this.index = i;
    }
};

function processSingleDayWeatherData(singleDayWeatherObject, weatherData){
    if (!weatherData || !weatherData.days || !weatherData.days[singleDayWeatherObject.index]) {
        throw new Error("Invalid input data structure");
    }
    singleDayWeatherObject.address = weatherData.resolvedAddress;
    singleDayWeatherObject.tzoffset = weatherData.tzoffset;
    let singleDayWeatherData = weatherData.days[singleDayWeatherObject.index];

    const {
        datetime,
        datetimeEpoch,
        temp,
        tempmax,
        tempmin,
        feelslike,
        conditions,
        icon,
        precipprob,
        preciptype,
        humidity,
        uvindex,
        windspeed,
        cloudcover,
        visibility
    } = singleDayWeatherData;

    const dateTimeFields = ["dateTime", "dateTimeEpoch"];
    const dateTimeValues = [datetime, datetimeEpoch];

    const tempFields = ["temp", "tempMax", "tempMin", "feelsLike"];
    const tempValues = [temp, tempmax, tempmin, feelslike];

    const nonTechnicalFields = ["description", "icon"];
    const nonTechnicalValues = [conditions, icon];

    const technicalFields = ["precipProb", "precipType", "humidity", "uvIndex", "windSpeed", "cloudCover", "visibility"];
    const technicalValues = [precipprob, preciptype, humidity, uvindex, windspeed, cloudcover, visibility];

    const allFields = dateTimeFields.concat(tempFields, nonTechnicalFields, technicalFields);
    const allValues = dateTimeValues.concat(tempValues, nonTechnicalValues, technicalValues);

    for (let i = 0; i < allFields.length; i++){
        singleDayWeatherObject[allFields[i]] = allValues[i];
    }
}