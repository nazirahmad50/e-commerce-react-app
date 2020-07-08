// create memoized selectors

import { createSelector } from "reselect";

// get a slice of the whole state which is cart
const selectCart = (state) => state.cart;

//first args is a collection of input selectors
// second args is a function that will return the value we want out of the selector
// because we use 'createSelector' to make this cart item select now its a memoi selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// total quantity of all cart items
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (acumalatedQuantity, cartItem) => acumalatedQuantity + cartItem.quantity,
      0
    )
);

// get the cart hidden property selctor
export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// total price of all the items in the cart  selector
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acumalatedQuantity, cartItem) =>
      acumalatedQuantity + (cartItem.quantity * cartItem.price),
    0
  )
);
