import Image from 'next/image'
import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import { priceFormatter } from '../utils/formatter';

interface IHomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number | null,
  }[]
}

const Button = styled('button', {
  background: '$green300',
  borderRadius: '6px',
  border: 0,
  padding: '4px 8px',
  color: '$white',
})

export default function Home({products}: IHomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map( product => {
        return (
          <Product key={product.id} className='keen-slider__slide'>
            <Image src={product.imageUrl}  width={520} height={520} alt=''/>

            <footer>
              <strong> {product.name } </strong>
              <span> {product.price && priceFormatter.format(product.price / 100)} </span>
            </footer>
          </Product>
        )
      })}
      
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map( product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,

    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}