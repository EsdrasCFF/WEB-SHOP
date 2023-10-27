import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {

  const { query } = useRouter()

  return(
    <ProductContainer>
      <ImageContainer/>
    
      <ProductDetails>
        <h1>Camiseta</h1>
        <span>
          R$ 79,90
        </span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, delectus. Earum consectetur, praesentium eveniet soluta repellendus officiis reprehenderit illo inventore modi exercitationem, odit magnam natus asperiores placeat neque recusandae! Nisi!</p>
      
        <button> Comprar agora </button>
      </ProductDetails>
    </ProductContainer>
  )
}