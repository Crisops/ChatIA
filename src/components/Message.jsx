import './css/Message.css'

function Message({type, message}) {

    const send = type === "gpt" ? "IA" : "Tú"


  return (
    <li className={`message ${type}`}>
        <span>{send}</span>
        <p>{message}</p>
  </li>
  )
}

export default Message