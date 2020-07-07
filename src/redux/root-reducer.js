import {combineReducers} from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";


// will combine all the reducers into one object
export default combineReducers({
    user:userReducer,
    cart:cartReducer
})