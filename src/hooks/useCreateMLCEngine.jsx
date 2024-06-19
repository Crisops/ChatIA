import { CreateWebWorkerMLCEngine  } from "@mlc-ai/web-llm";
import { useState } from 'react'
import { useMessageStore } from '../components/store/MessageStore';
import { updateMessagesChatIA } from "../helpers/updateMessagesChatIA";



export const useCreateMLCEngine = () => {

    const {messages, progressIA, setIsLoading, loadingProgressIA, setLoadingPorgressIA, setProgressIA, setSendMessage, setErrorEngine} = useMessageStore(state => state)

    const [engineMLC, setEngineMLC] = useState(null)

    const getMLCEngine = async ({MODEL_ID_GEMMA}) => {
        try{
            const engine = await CreateWebWorkerMLCEngine(
                new Worker(new URL('../workers/worker.js', import.meta.url), {type: "module"}),
                MODEL_ID_GEMMA,
                {
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
            setErrorEngine({error: true, messageText: error})
        } finally {
            setTimeout(() => {
                setProgressIA("")
            }, 1000);
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
                setSendMessage(prevMessages => updateMessagesChatIA({prevMessages, delta}))
            }
            setIsLoading(false)
        } catch (error) {
            setErrorEngine({error: true, messageText: "Lo siento, al parecer hubo un error en la carga del mensaje. Vuelve a intentarlo más tarde."})
        }

    }

    return {engineMLC, messages, progressIA, getMLCEngine, chatTimeRealIA}

}