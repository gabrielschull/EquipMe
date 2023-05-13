import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Stripe: React.FC = (): JSX.Element => {
  const [product, setProduct] = useState({
    name: 'Gear Rental via GearHub',
    price: 100,
    productOwner: 'Raul Barros',
    description: 'Bicycle model RT200',
    quantity: 1,
  });

  const stripeAPIKey = process.env.REACT_APP_STRIPE_KEY!;

  const makePayment = async () => {
    const stripe = await loadStripe(stripeAPIKey);
    const body = { product };
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      'http://localhost:8000/api/create-checkout-session',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    // if (result.error) {
    //   console.log(result?.error);
    // }
  };
  return (
    <>
      <p>{product.name}</p>
      <p>{product.description}</p>

      <button onClick={makePayment}>Buy Now for {product.price}</button>
    </>
  );
};

export default Stripe;
