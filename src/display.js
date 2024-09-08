export default function display(currentWeather, travelDaysWeather, messages) {
    function updateDateTime(locationElement, tzoffset) {
        const now = new Date();
        const localTime = now.getTime() + (tzoffset * 60 * 60 * 1000);
        const localDate = new Date(localTime);

        const options = {
            weekday: 'long', year: 'numeric', month: 'long', 
            day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
        };
        const formattedDate = localDate.toLocaleString('en-US', options);

        locationElement.textContent = formattedDate;
    }

    // Update current weather section
    document.querySelector('#weather-current .location-text').textContent = currentWeather.address;
    document.querySelector('#weather-current .temp-temp').textContent = `${currentWeather.temp}°C`;
    document.querySelector('#current-temp-desc-desc').textContent = currentWeather.description;
    document.querySelector('#current-temp-desc-feels-like').textContent = `Feels like ${currentWeather.feelsLike}°C`;
    document.querySelector('#current-temp-desc-feels-hl').textContent = `High: ${currentWeather.tempMax}°C Low: ${currentWeather.tempMin}°C`;
    document.querySelector('#weather-current-details-data-precip').textContent = `${currentWeather.precipProb}%`;
    document.querySelector('#weather-current-details-data-humidity').textContent = `${currentWeather.humidity}%`;
    document.querySelector('#weather-current-details-data-uv-index').textContent = currentWeather.uvIndex;
    document.querySelector('#weather-current-details-data-wind-speed').textContent = `${currentWeather.windSpeed} km/h`;
    document.querySelector('#weather-current-details-data-cloud-cover').textContent = `${currentWeather.cloudCover}%`;
    document.querySelector('#weather-current-details-data-visibility').textContent = `${currentWeather.visibility} km`;

    const currentLocationElement = document.querySelector('#weather-current .location-text-details');
    updateDateTime(currentLocationElement, currentWeather.tzoffset);

    // Update travel weather section (using the first item in travelDaysWeather)
    const travelWeather = travelDaysWeather[0];
    document.querySelector('#weather-new .location-text').textContent = travelWeather.address;
    document.querySelector('#weather-new .temp-temp').textContent = `${travelWeather.temp}°C`;
    document.querySelector('#new-temp-desc-desc').textContent = travelWeather.description;
    document.querySelector('#new-temp-desc-feels-like').textContent = `Feels like ${travelWeather.feelsLike}°C`;
    document.querySelector('#new-temp-desc-feels-hl').textContent = `High: ${travelWeather.tempMax}°C Low: ${travelWeather.tempMin}°C`;
    document.querySelector('#weather-new-details-data-precip').textContent = `${travelWeather.precipProb}%`;
    document.querySelector('#weather-new-details-data-humidity').textContent = `${travelWeather.humidity}%`;
    document.querySelector('#weather-new-details-data-uv-index').textContent = travelWeather.uvIndex;
    document.querySelector('#weather-new-details-data-wind-speed').textContent = `${travelWeather.windSpeed} km/h`;
    document.querySelector('#weather-new-details-data-cloud-cover').textContent = `${travelWeather.cloudCover}%`;
    document.querySelector('#weather-new-details-data-visibility').textContent = `${travelWeather.visibility} km`;

    const travelLocationElement = document.querySelector('#weather-new .location-text-details');
    updateDateTime(travelLocationElement, travelWeather.tzoffset);

    // Update reminder section with messages
    const reminderSection = document.querySelector('.reminder .section-content');
    reminderSection.innerHTML = ''; // Clear existing messages

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
    
        const messageBox = document.createElement('div');
        messageBox.className = 'message-box';
    
        const messageCO = document.createElement('p');
        messageCO.className = 'message-condition-observation';
        messageCO.textContent = `${message.condition} - ${message.observation}`;
        messageBox.appendChild(messageCO);
    
        if (Array.isArray(message.recommendations)) {
            const recommendationList = document.createElement('ul');
            recommendationList.className = 'recommendation-list';
    
            for (let j = 0; j < message.recommendations.length; j++) {
                const recommendationItem = document.createElement('li');
                recommendationItem.textContent = message.recommendations[j];
                recommendationList.appendChild(recommendationItem);
            }
    
            messageBox.appendChild(recommendationList);
        }
    
        reminderSection.appendChild(messageBox);
    }
}
