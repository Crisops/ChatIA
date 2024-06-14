import './css/Message.css'

function Message({type, message}) {

    const whoSend = type === "gpt" ? "IA" : "Tú"


  return (
    <li className={`message ${type}`}>
        <span>{whoSend}</span>
        <p>{message}</p>
  </li>
  )
}

export default Message