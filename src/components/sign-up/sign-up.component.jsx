import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase-util";

import "./sign-up.styles.scss";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async e =>{
      e.preventDefault();

      const { displayName, email, password, confirmPassword } = this.state;

      if (password !== confirmPassword){
          alert("Passswords dont match");
          return;
      }

      try {
          // create user with email and password
          const {user} = await auth.createUserWithEmailAndPassword(email,password);
        
          // add the this newly created user to firestore
         await createUserProfileDocument(user, {displayName});
        
         // this will clear the form
         this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
         })
          
      } catch (error) {
          console.log(error)
      }
  };

  handleChange = e =>{
      const {name, value} = e.target;

      // set the value for the respective input name
      // e.g. name=displayName or name=email etc
      this.setState({[name]:value});
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
