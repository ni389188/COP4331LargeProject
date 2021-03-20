import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from "redux"

import UserReducer from "./Reducers/UserRedecuer"

const rootReducer = combineReducers(
    {
        UserReducer
    }
);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;