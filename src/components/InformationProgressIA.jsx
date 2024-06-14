import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useState, useEffect } from 'react'
import {useMessageStore} from "./store/MessageStore"
import './css/InformationProgressIA.css'


const InformationProgressIA = () => {

    const [progressIA, setProgressIA] = useState("");
    const [erroProgress, setErrorProgress] = useState(null);
    const [engineMLC, setEngineMLC] = useState(null);
    const [botMessages, setBotMessage] = useState([])

    const {messages, loadingProgressIA, setLoadingPorgressIA} = useMessageStore(state => state)

    const SELECT_MODEL = "gemma-2b-it-q4f16_1-MLC-1k"
    // const SELECT_MODEL = "Phi-3-mini-4k-instruct-q4f16_1-MLC"

    useEffect(() =>{
        loadingProgressIAEngine();
    }, [messages])


    const loadingProgressIAEngine = async () => {
        try {
            if(!engineMLC){
                const engine = await CreateMLCEngine(SELECT_MODEL, {
                    initProgressCallback: (info) => {
                        const {progress, text} = info
                        if(progress && !loadingProgressIA) setLoadingPorgressIA(progress)
                        setProgressIA(text) 
                    }
                })
                setEngineMLC(engine)
            }
            if(messages.length !== 0){
                const historyMessage = [...messages]
                const { messageText } = historyMessage.pop()
                console.log(messageText);
                const reply = await engineMLC.chat.completions.create({
                    messages: [
                        ...botMessages,
                        {
                            role: "user",
                            content: messageText
                        }
                    ]
                })
                console.log(reply)
                const [botMessage] = reply.choices
                const {message} = botMessage
                setBotMessage(prev => [...prev, message])
            }
        } catch (error) {
            const {message} = error
            setErrorProgress(message)
        }
    }




    return (
        <small>{ erroProgress ? erroProgress : progressIA}</small>
    )
}

export default InformationProgressIA