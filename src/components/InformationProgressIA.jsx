import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useState, useEffect } from 'react'
import {useMessageStore} from "./store/MessageStore"
import './css/InformationProgressIA.css'


const InformationProgressIA = () => {

    const [progressIA, setProgressIA] = useState("");
    const [errorProgress, setErrorProgress] = useState("");
    const [engineMLC, setEngineMLC] = useState(null);

    const {isLoading, messages, setIsLoading, loadingProgressIA, setLoadingPorgressIA, setSendMessage} = useMessageStore(state => state)

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
                        if(progress && !loadingProgressIA){
                            setLoadingPorgressIA(progress)
                            setIsLoading(false)
                        } 
                        setProgressIA(text) 
                    }
                })
                setEngineMLC(engine)
            }

            if(messages.length !== 0 && messages[messages.length - 1].role === "user"){
                const chucks = await engineMLC.chat.completions.create({
                    messages,
                    stream: true
                })
                for await (const chuck of chucks) {
                    const [botMessage]  = chuck.choices;
                    const {delta} = botMessage
                    setSendMessage(prevMessages => {
                        const lastMessageIndex = prevMessages.length - 1;
                        const lastMessage = prevMessages[lastMessageIndex];
                        if (lastMessage.role === "assistant") {
                            const updatedMessage = {
                            ...lastMessage,
                            content: lastMessage.content + (delta.content || '')
                            };
                            return [
                                ...prevMessages.slice(0, lastMessageIndex),
                                updatedMessage
                            ];
                        } else {
                            return [
                                ...prevMessages,
                                { role: "assistant", content: delta.content || '' }
                            ];
                        }
                    })
                }
                setIsLoading(false)
            }
        } catch (error) {
            const {message} = error
            setErrorProgress(message)
        }
    }




    return (
        <small>{ errorProgress ? errorProgress : progressIA}</small>
    )
}

export default InformationProgressIA