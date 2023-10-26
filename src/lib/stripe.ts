import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY as string

export const stripe = new Stripe(key,{
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Web Shop'
  }
})