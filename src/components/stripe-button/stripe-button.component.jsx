import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) =>{
    // stripe accespts prices in cents
    const priceForStripe = price * 100;
    const PUBLISHABLE_KEY = "pk_test_51H3PHpFYrulPb9tzhiWAFPplksaWhF21ObvuNlzTZRTRA7RTy8CLGYtwxzwXqRMqvSZM0SAAtYrWfJfOcOAL0F7W008nzsh0E9";

    const onToken = token =>{
        alert("payment successful")
    }

    return(
        <StripeCheckout
            label="Pay Now"
            name="Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={PUBLISHABLE_KEY}
        />
    )

}

export default StripeCheckoutButton;