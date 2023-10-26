import Image from 'next/image'
import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home'

import image1 from '../assets/shirts/1.png';
import image2 from '../assets/shirts/2.png';
import image3 from '../assets/shirts/3.png';

const Button = styled('button', {
  background: '$green300',
  borderRadius: '6px',
  border: 0,
  padding: '4px 8px',
  color: '$white',
})

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={image1}  width={520} height={520} alt=''/>

        <footer>
          <strong> Casmisa XYZ </strong>
          <span> R$ 79,90 </span>
        </footer>
      </Product>
      
      <Product>
        <Image src={image2}  width={520} height={520} alt=''/>

        <footer>
          <strong> Casmisa XYZ </strong>
          <span> R$ 79,90 </span>
        </footer>
      </Product>
      
    </HomeContainer>
  )
}