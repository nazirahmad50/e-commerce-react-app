import {UserActionTypes} from "./user.types"

// returns an object of the set current user action
export const setCurrentUser = user =>({
    type: UserActionTypes.SET_CURRENT_USER,
    payload:user
})