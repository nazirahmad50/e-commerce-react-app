
const INITIAL_STATE = {
    currentUser:null
}

// state is the previous or last state
// if state is ever undefined or not set then use initial state 
const userReducer = (state = INITIAL_STATE, action) =>{

    switch (action.type) {
        case "SET_CURRENT_USER":
            return{
                // spread everything on the previous state
                ...state,
                // change the property that we care about
                currentUser: action.payload
            }    
        default:
            // if none of the action type match then return the current state
            return state;
    }
} 

export default userReducer;