import React, { useEffect, useState } from 'react';
import {CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from '@stripe/react-stripe-js';

function StripeForm(props) {
  // const [playing, setPlaying] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
  
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
  
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const CardNumberElement = elements.getElement(CardNumberElement);
  
    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: CardNumberElement,
    });
  
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <>
      {/* TODO: There is a slight delay in loading the inputs. Trying to show message until it loads to avoid confusion */}
      {elements ? (
        <form onSubmit={handleSubmit}>
          {/* <CardElement /> */}
          <div className="card-field">
            <span>Card Number</span>
            <div className="field">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="exp-and-cvv flex">
            <div className="exp">
              <span>Expiration</span>
              <div className="field">
                <CardExpiryElement />
              </div>
            </div>

            <div className="cvv">
              <span>CVV</span>
              <div className="field">
                <CardCvcElement />
              </div>
            </div>
          </div>
          <button type="submit" className="buy-confirm" disabled={!stripe}>Pay</button>
          <button className="buy-cancel">Cancel</button>
        </form>
      ) : (
        <p>Getting your form ready</p>
      )}
    </>
  )
}
export default StripeForm;