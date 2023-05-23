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
  console.log('🐆 req.body (what is coming into back-end', req.body);
  const { gearInfo, rental_duration_days } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: gearInfo.name,
            description: gearInfo.description,
          },
          unit_amount: gearInfo.price_day * 100,
        },
        quantity: rental_duration_days === 0 ? 1 : rental_duration_days,
      },
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Deposit for:  ${gearInfo.name}`,
          },
          unit_amount: gearInfo.deposit * 100,
        },
        quantity: 1,
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
