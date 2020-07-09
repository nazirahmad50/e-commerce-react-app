import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";

// local storage object on our window browser
// this is esentialy telling redux persist that i want to use local storage as my default storage
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";


const persistConfig = {
    // start storing from the root
    key:"root", 
    // the storage type to use such local or session storage
    // this will use local storage
    storage,
    // names of any reducers we want to store
    // user reducer is handled by firebase so need for that
    whitelist:["cart"]

}

// will combine all the reducers into one object
const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory:directoryReducer,
    shop:shopReducer
})

// return modified root reducer with persist capabilities
export default persistReducer(persistConfig, rootReducer);