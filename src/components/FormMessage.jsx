import { useRef, useEffect } from 'react'
import { useMessageStore } from './store/MessageStore'
import './css/FormMessage.css'


const FormMessage = () => {


  const {isLoading, setIsLoading, loadingProgressIA, messageForm, messages, setMessageForm, setSendMessage} = useMessageStore(state => state)

  const loadingData = loadingProgressIA && !isLoading ? "complete" : "loading"

  const inputRef = useRef()

  useEffect(() =>{
    (isLoading) ? inputRef.current.setAttribute("disabled", "true") :  inputRef.current.removeAttribute("disabled")
  },[isLoading])

  const handleChangeSendMessage = (event) => {

    const { value } = event.target
    setMessageForm(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(messageForm.trim() === "") return alert("El campo esta vacio")

    const newMessage = { role: 'user', content: messageForm }
    
    setSendMessage(prevMessages => [...prevMessages, newMessage]) 
    setMessageForm("")
    setIsLoading(true)

  }
    

  return (
    <form onSubmit={handleSubmit}>
        <input ref={inputRef} onChange={handleChangeSendMessage} placeholder="Escribe tu mensaje aquí..." value={messageForm}  />
        <button className={loadingData}>Enviar</button>
    </form>
  )
}

export default FormMessage