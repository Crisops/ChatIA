import Message from "./Message"
import './css/ContainerMessage.css'

function ContainerMessages() {
  
  return (
    <ul>
        <Message type="user" message="¿Hola como estas?"/>
        <Message type="gpt" message="Soy una inteligencia artifical muy grandiosa"/>
        <Message type="user" message="Esto es una prueba para mirar que no se rompan los estilos al momento de diseñar nuestro chat con una conversación larga "/>
    </ul>
  )
}

export default ContainerMessages