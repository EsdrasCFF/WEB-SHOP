import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import { priceFormatter } from '../utils/formatter';
import Link from 'next/link';
import Head from 'next/head';

interface IHomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number | null,
  }[]
}

export default function Home({products}: IHomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>

      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map( product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
              <Product className='keen-slider__slide'>
                <Image src={product.imageUrl}  width={520} height={520} alt=''/>

                <footer>
                  <strong> {product.name } </strong>
                  <span> {product.price && priceFormatter.format(product.price / 100)} </span>
                </footer>
              </Product>
            </Link>
          )
        })}
        
      </HomeContainer>
    </>
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