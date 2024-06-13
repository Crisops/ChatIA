import './css/FormMessage.css'
import { useMessageStore } from './store/MessageStore'


const FormMessage = () => {


  const {isLoading, messageForm, messages, setIsLoading, setMessageForm, setSendMessage} = useMessageStore(state => state)

  


  // console.log(engineIA);

  
  const handleChangeSendMessage = (event) => {

    const { value } = event.target
    setMessageForm(value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    if(messageForm.trim() === "") return alert("El campo esta vacio")

      const newMessage = { type: 'user', messageText: messageForm }
    
    setSendMessage([...messages, newMessage]) 
    setMessageForm("")
  }
    

  return (
    <form onSubmit={handleSubmit}>
        <input onChange={handleChangeSendMessage} placeholder="Escribe tu mensaje aquí..." value={messageForm} />
        <button>Enviar</button>
    </form>
  )
}

export default FormMessage