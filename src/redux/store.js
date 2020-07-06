import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// store all the middlewares in an array
// so if we need to add any extra middlewars we can add it here and will be able to spread them as args in 'applyMiddleware'
const middlewares = [logger];

// the middleware will capture any action that gets fired and we can catch them and will be able to display them
// the middleware is in the middle between the action and the root reducer
const store = createStore(rootReducer,applyMiddleware(...middlewares))

export default store;