import StripeCheckout from 'react-stripe-checkout';

import React from 'react'

function StripeCheckoutButton({price}) {
    const priceForStripe = price * 100;
    const pbKey = 'pk_test_GIcG7BaFUkB3qIBCWltJ8MZI005PikTfIT'
    const onToken = token => {
        console.log('Token', token);
        alert('Payment succesful');
    }
    return (
        <StripeCheckout
        label='Pay Now'
        name='E-Commerce'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total i $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={pbKey}
        />
    )
}

export default StripeCheckoutButton
