import {useEffect, useRef} from 'react'
import Message from "./Message"
import { useMessageStore } from "./store/MessageStore"
import './css/ContainerMessage.css'

function ContainerMessages() {

  const {messages} = useMessageStore(state => state)
  const mainRef = useRef()

  useEffect(() => {

    mainRef.current.scrollTop = mainRef.current.scrollHeight

  },[messages])


  return (
    <main ref={mainRef}>
      <ul>
          {
          messages.length !== 0 &&
          messages.map(({role, content}, index) => (
            <Message key={index} type={role} message={content} />
          ))}
      </ul>
    </main>
  )
}

export default ContainerMessages