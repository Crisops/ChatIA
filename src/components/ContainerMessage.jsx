import {useEffect, useRef} from 'react'
import Message from "./Message"
import { useMessageStore } from "./store/MessageStore"
import './css/ContainerMessage.css'
import Loader from './Loader'

function ContainerMessages() {

  const {messages, progressIA, errorEngine} = useMessageStore(state => state)
  const mainRef = useRef()

  const {error} = errorEngine

  useEffect(() => {

    mainRef.current.scrollTop = mainRef.current.scrollHeight

  },[messages])


  return (
    <main ref={mainRef}>
      {(error || progressIA !== "") && <Loader/>}
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