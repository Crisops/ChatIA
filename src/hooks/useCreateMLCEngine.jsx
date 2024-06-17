import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useEffect, useState } from 'react'
import { useMessageStore } from '../components/store/MessageStore';



export const useCreateMLCEngine = () => {

    const {messages, progressIA, setIsLoading, loadingProgressIA, setLoadingPorgressIA, setProgressIA, setSendMessage} = useMessageStore(state => state)

    const [engineMLC, setEngineMLC] = useState(null)
    const [errorEngine, setErrorEngine] = useState([{ message: "" }])


    const getMLCEngine = async ({SELECT_MODEL}) => {
        try{
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
        }catch(error){
            const { message } = error
            setErrorEngine(errorMessage => [{...errorMessage, message}])
        }

    }


    const chatTimeRealIA = async () => {
        try {
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
        } catch (error) {
            const { message } = error
            setErrorEngine(errorMessage => [{...errorMessage, message}])
        }

    }



    return {engineMLC, messages, progressIA, errorEngine, getMLCEngine, chatTimeRealIA}

}