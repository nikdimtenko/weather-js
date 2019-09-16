import {weatherAPI} from "../api/AxiosRequest";
import {localStorageAPI} from "../LocalStorage/LocalStorage";

const SET_DATA_CITY = "SET_DATA_CITY";
const SET_HISTORY_CITIES = "GET_HISTORY_CITIES";
const KEY = "CITIES";
const SET_ERROR = "SET_ERROR";

const KELWIN = 273.15;

let initialState = {
    cityData: {},
    historyСities: [],
    error: null
};

export const simpleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_CITY :
            return {
                ...state, error: null, cityData: action.data, historyСities: [action.data.name, ...state.historyСities
                    .filter(savedCity => savedCity !== action.data.name ? true : false)]
            };
        case SET_HISTORY_CITIES:
            return {...state, historyСities: action.historyСities};
        case SET_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export const sendRequest = (cityName) => (dispatch, getState) => {
    weatherAPI.getWeather(cityName)
        .then(data => {
            dispatch({
                type: SET_DATA_CITY,
                data: {
                    temp: Math.round(data.main.temp - KELWIN),
                    pressure: data.main.pressure,
                    country: data.sys.country.toLowerCase(),
                    name: data.name,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    clouds: data.clouds.all,
                    speed: data.wind.speed
                }
            });
            localStorageAPI.setData(KEY, JSON.stringify(getState().reducer.historyСities));
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_ERROR, error});
        })
};
export const getHistoryCities = () => (dispatch) => {
    localStorageAPI.getData(KEY)
        .then(cities => {
            let newCities = JSON.parse(cities);
            dispatch({
                type: SET_HISTORY_CITIES,
                historyСities: [...newCities]
            })
        })
};