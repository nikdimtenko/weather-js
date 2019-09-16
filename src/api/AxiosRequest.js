import * as axios from "axios";

const APPID = "&appid=d9645fd8fbbfa379bb2f21dfce308d62";

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

export const weatherAPI = {
    getWeather(cityName) {
        return instance.get(`weather?q=${cityName}${APPID}`)
            .then(response => response.data)
            .catch(response => {
                return new Promise((resolve, reject) => reject(response.response.statusText))
            })
    }
};