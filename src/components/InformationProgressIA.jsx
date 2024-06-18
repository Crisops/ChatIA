import { useState, useEffect } from 'react'
import './css/InformationProgressIA.css'
import { useCreateMLCEngine } from "../hooks/useCreateMLCEngine";


const InformationProgressIA = () => {

    const SELECT_MODEL = "gemma-2b-it-q4f16_1-MLC-1k"
    // const SELECT_MODEL = "Phi-3-mini-4k-instruct-q4f16_1-MLC" // "BEST" AI Model

    const {engineMLC, messages, progressIA, errorEngine, getMLCEngine, chatTimeRealIA} = useCreateMLCEngine()

    const [messageText] = errorEngine

    useEffect(() =>{
        if(!engineMLC){
            getMLCEngine({SELECT_MODEL})
        }
    }, [engineMLC])

    useEffect(() =>{
        if(engineMLC && messages.length !== 0 && messages[messages.length - 1].role === "user"){
            chatTimeRealIA()
        }
    }, [messages])

    return (
        <small>{ messageText.message ? messageText.message : progressIA}</small>
    )
}

export default InformationProgressIA