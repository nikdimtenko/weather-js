import {applyMiddleware, combineReducers, createStore} from "redux";
import {simpleReducer} from "./simpleReducer";
import thunk from "redux-thunk"

let reducer = combineReducers({
    reducer: simpleReducer,
});

export let store = createStore(reducer, applyMiddleware(thunk));