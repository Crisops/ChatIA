import './css/FormMessage.css'
import { useMessageStore } from './store/MessageStore'


const FormMessage = () => {


  const {loadingProgressIA, messageForm, messages, setMessageForm, setSendMessage} = useMessageStore(state => state)

  const buttonClass = loadingProgressIA ? "complete" : "loading"


  const handleChangeSendMessage = (event) => {

    const { value } = event.target
    setMessageForm(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(messageForm.trim() === "") return alert("El campo esta vacio")

      const newMessage = { type: 'user', messageText: messageForm }
    
    setSendMessage(prevMessages => [...prevMessages, newMessage]) 
    setMessageForm("")
  }
    

  return (
    <form onSubmit={handleSubmit}>
        <input onChange={handleChangeSendMessage} placeholder="Escribe tu mensaje aquí..." value={messageForm} />
        <button className={buttonClass}>Enviar</button>
    </form>
  )
}

export default FormMessage