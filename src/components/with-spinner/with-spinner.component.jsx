import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// a higher-order component transforms a component into another component
// take the 'WrappedComponent' and wrap it in another componenet which is the function after 'WrappedComponent'
const WithSpinner = (WrappedComponent) => {
  // destructure the 'WrappedComponent' args
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      //else render the componenet as normal
      <WrappedComponent {...otherProps} />
    );
  };

  // return a new componenet with updatd logic
  return Spinner;
};

export default WithSpinner;
