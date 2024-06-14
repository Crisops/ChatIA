import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useState, useEffect } from 'react'
import {useMessageStore} from "./store/MessageStore"
import './css/InformationProgressIA.css'


const InformationProgressIA = () => {

    const [progressIA, setProgressIA] = useState("");
    const [erroProgress, setErrorProgress] = useState(null);

    const SELECT_MODEL = "gemma-2b-it-q4f16_1-MLC-1k"
    // const SELECT_MODEL = "Phi-3-mini-4k-instruct-q4f16_1-MLC"
    
    useEffect(() =>{
        loadingProgressIA();
    }, [])


    const loadingProgressIA = async () => {
        try {
            await CreateMLCEngine(SELECT_MODEL, {
                initProgressCallback: (info) => {
                    const {text} = info
                setProgressIA(text)
                }
            })
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