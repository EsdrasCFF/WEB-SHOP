import { styled } from '../styles'

const Button = styled('button', {
  background: '$green300',
  borderRadius: '6px',
  border: 0,
  padding: '4px 8px',
  color: '$white',
})

export default function Home() {
  return (
    <Button>
      Enviar
    </Button>
  )
}
