const cors = require('cors');
const express = require('express');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
PORT = 8000;
const app = express();

// Middlewares here
app.use(express.json());
app.use(cors());

// Routes here
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/paymentsuccessful',
    cancel_url: 'http://localhost:3000/paymentcanceled',
  });
  res.json({ id: session.id });
});

// Listen
app.listen(PORT, () => {
  console.log(`💡 ------> Server started at http://localhost:${PORT}`);
});
