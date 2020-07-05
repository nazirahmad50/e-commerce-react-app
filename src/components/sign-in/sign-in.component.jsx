import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle, auth } from "../../firebase/firebase-util";

import "./sign-in.styles.scss";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      // allow user to to sign in with email and password
      await auth.signInWithEmailAndPassword(email, password);

      // clear form data after user signes in
      this.setState({ email: "", password: "" });

    } catch (error) {
      console.log(error)
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    // [] allows you handle your input field change events in one simple line,
    //instead of having to write out a bunch of handleChange functions for each different input field
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            label="email"
            required
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            label="Password"
            required
            handleChange={this.handleChange}
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="submit"
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
