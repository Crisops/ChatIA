import Message from "./Message"
import { useMessageStore } from "./store/MessageStore"
import './css/ContainerMessage.css'

function ContainerMessages() {

  const {messages} = useMessageStore(state => state)

  return (
    <ul>
        {
        messages.length !== 0 &&
        messages.map(({role, content}, index) => (
          <Message key={index} type={role} message={content} />
        ))}
    </ul>
  )
}

export default ContainerMessages