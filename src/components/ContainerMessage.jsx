import { useEffect } from "react"
import useEngineIA from '../hooks/useEngine'
import Message from "./Message"
import { useMessageStore } from './store/MessageStore'
import './css/ContainerMessage.css'

function ContainerMessages() {

  const {isLoading,progressIA, setProgressIA, setIsLoading } = useMessageStore(state => state)

  const SELECT_MODEL = "gemma-2b-it-q4f32_1-MLC"


  useEffect(() => {
    
    const getProgressLoadingIA = async () => {

      const engine = await useEngineIA(SELECT_MODEL)

      setProgressIA(engine)
    }

    getProgressLoadingIA()
    
  }, [progressIA])

  


  return (
    <ul>
        <Message type="user" message="¿Hola como estas?"/>
        <Message type="gpt" message="Soy una inteligencia artifical muy grandiosa"/>
        <Message type="user" message="Esto es una prueba para mirar que no se rompan los estilos al momento de diseñar nuestro chat con una conversación larga "/>
    </ul>
  )
}

export default ContainerMessages