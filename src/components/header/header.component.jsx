import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// utilised when we need to use multiple selectors
import {createStructuredSelector} from "reselect";

import { auth } from "../../firebase/firebase-util";
import CartIcon from "../cart-icon/cat-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";


// special syntax in react for importing svg
import { ReactComponent as Logo } from "../../assets/4.3 crown.svg";

import "./header.component.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        Contact
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// 'createStructuredSelector' will automatically pass the top level state into each selector
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// 'connect' is HOC allows us modify components to have access to things related to redux
// first args returns the state as props from redux store and passes it to the header component as props
export default connect(mapStateToProps)(Header);
