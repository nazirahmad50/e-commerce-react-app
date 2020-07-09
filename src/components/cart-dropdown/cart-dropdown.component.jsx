import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toogleCartHidden } from "../../redux/cart/cart.action";

import ".//cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        // just using one action so might as well include it inside the compoent
        dispatch(toogleCartHidden())
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// use memoized selector
// this will make sure that our cart drop down is not getting re-renderd when the state changes that is unrelated to the cart items which helps in performance
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// if mapStateToDispatch is not passed as second args to connect then connect will pass the dispatch as props to the component
export default withRouter(connect(mapStateToProps)(CartDropdown));
