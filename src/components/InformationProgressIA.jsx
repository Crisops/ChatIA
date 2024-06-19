import { useState, useEffect } from 'react'
import { useCreateMLCEngine } from "../hooks/useCreateMLCEngine";
import { MODELS_IDS } from '../lib/config.js'


const InformationProgressIA = () => {

    const {engineMLC, messages, progressIA, getMLCEngine, chatTimeRealIA} = useCreateMLCEngine()

   const {MODEL_ID_GEMMA} = MODELS_IDS

    useEffect(() =>{
        if(!engineMLC){
            getMLCEngine({MODEL_ID_GEMMA})
        }
    }, [engineMLC])

    useEffect(() =>{
        if(engineMLC && messages.length !== 0 && messages[messages.length - 1].role === "user"){
            chatTimeRealIA()
        }
    }, [messages])
}

export default InformationProgressIA