import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Stripe: React.FC = (): JSX.Element => {
  const [product, setProduct] = useState({
    name: 'Go FullStack with KnowledgeHut',
    price: 1000,
    productOwner: 'KnowledgeHut',
    description:
      'This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.',
    quantity: 1,
  });

  const makePayment = async () => {
    const stripe = await loadStripe('your-publishable-key');
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

    // if (result?.error) {
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
