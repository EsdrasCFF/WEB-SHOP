import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { priceFormatter } from "@/src/utils/formatter"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"

interface IProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: number | null,
    description: string
  }
}

export default function Product({ product }: IProductProps) {


  return(
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageContainer>
    
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>
          {product.price && priceFormatter.format(product.price / 100)  }
        </span>

        <p>{product.description}</p>
      
        <button> Comprar agora </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return{
    paths: [
      { params: {id: 'prod_OtK4DfmMeCIzAl'}}
    ],
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params?.id;

  if(!productId) {
    return {
      notFound: true
    }
  }
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
      },
      revalidate: 60 * 60 * 1, //1 hour
    },
  }
}