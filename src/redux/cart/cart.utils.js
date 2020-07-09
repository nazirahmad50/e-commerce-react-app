export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // if the item that is being added to the cart already exists in the cartItems array
  if (existingItem) {
    // map over each cart item and check if the item that is being added to the cart has its id equlal to one of the items in the array then increase its quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // add a base quantity of 1 for the cart item to add if the existingItem returns false
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

// remove item from cart based on the quantity arrows
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // if the existingItem quantity is at one then remove it
  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  // if cartItem quantity is more than one
  // decrease the quantity of te cart item if teh cart item matches the cart to remove id
  // otherwise return cartItem as they dont need to modified
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
   );
};
