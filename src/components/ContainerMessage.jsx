import Message from "./Message"
import { useMessageStore } from "./store/MessageStore"
import './css/ContainerMessage.css'

function ContainerMessages() {

  const {messages} = useMessageStore(state => state)

  return (
    <ul>
        {
        messages.length !== 0 &&
        messages.map(({type, messageText}, index) => (
          <Message key={index} type={type} message={messageText} />
        ))}
    </ul>
  )
}

export default ContainerMessages