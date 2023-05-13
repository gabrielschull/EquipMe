import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { useState } from 'react';
import { Stripe, StripeElement, StripeElements} from '@stripe/stripe-js';

const Payment: React.FC = (): JSX.Element => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  stripe: Stripe,
  elements: StripeElements,
): Promise<void> => {
  e.preventDefault();
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: 'Jenny Rosen',
    },
  })
  .then(function(result) {
    if (!error) {
  try {
const {id} = PaymentMethod
const response = await axios.post("SOMETHING GOES HE, {
  amount: 1000,
  id
})
  }catch (error)
}
};

//

  return (
    // <div className="w-1/3 p-5">
    //   <h2 className="text-2xl font-bold mb-5">Payment</h2>
    //   <form className="bg-white p-10 rounded-lg shadow-lg">
    //     <div className="mb-4">
    //       <label
    //         className="block text-gray-700 font-bold mb-2"
    //         htmlFor="cardNumber">
    //         Card Number
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         id="cardNumber"
    //         type="text"
    //         placeholder="Enter Card Number"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label
    //         className="block text-gray-700 font-bold mb-2"
    //         htmlFor="expiryDate">
    //         Expiry Date
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         id="expiryDate"
    //         type="text"
    //         placeholder="MM/YY"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
    //         CVV
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         id="cvv"
    //         type="text"
    //         placeholder="Enter CVV"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-bold mb-2" htmlFor="total">
    //         Total
    //       </label>
    //       <div className="flex items-center justify-between">
    //         <span className="text-gray-700 font-bold">100</span>
    //         <span className="text-gray-700">USD</span>
    //       </div>
    //     </div>
    //     <div className="flex justify-center">
    //       <button
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //         type="button">
    //         Pay
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <></>
  );
};

export default Payment;
