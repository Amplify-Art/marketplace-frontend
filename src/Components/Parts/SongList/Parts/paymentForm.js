import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from './stripeForm';

const stripePromise = loadStripe('pk_test_GiWMBXM28feMixQguajmw3Gn');



const handleSubmit = () => {
  console.log('Submit')
};

function PaymentForm(props) {
  // const [playing, setPlaying] = useState(false);
  return (
    <div className="payment-form">
      <Elements stripe={stripePromise}>
        <StripeForm />
      </Elements>
    </div>
  )
}
export default PaymentForm;