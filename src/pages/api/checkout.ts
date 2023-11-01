import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  
  const { priceId } = request.body;

  if(!priceId) {
    return response.status(400).json({ error: 'Price not found!'})
  }

  if(request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed!'})
  }

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
  })


  return response.status(201).json({
    checkoutUrl: checkoutSession.url
   })
}