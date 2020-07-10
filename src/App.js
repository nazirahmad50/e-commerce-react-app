import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// utilised when we need to use multiple selectors
import {createStructuredSelector} from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/Shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase-util";

import { setCurrentUser } from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";


class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if a user is signed in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // listen for changes on userRef also get back the first state of that data
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      // if user signs out
      else {
        // current user is null
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // close the subscription as we dont want any memory leaks
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        {/*placing the header outside the switch and routers will allow it to display in every page*/}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// 'dispatch' dispatches an action
// so whatever actions we pass to the dispatch func it will pass that action to every reducer
const mapDispatchToProps = (dispatch) => ({
  // create anonymous setCurrentUser func and dispatch the setCurrentUser action
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// first args for returning anyhting from redux store
// second arg dispatches somehting to redux store that can potentialy modify it
export default connect(mapStateToProps, mapDispatchToProps)(App);
