import { createSelector } from "reselect";

const selectUser = state => state.user;

// get curren user selector
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)