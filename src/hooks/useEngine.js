import { CreateMLCEngine } from "@mlc-ai/web-llm";


const useEngineIA = async (modelId) =>{

    let engine

    try {
         engine = await CreateMLCEngine(modelId, {
            initProgressCallback: (info) => {
                console.log("initProgressCallback",info);
            }
        })
    } catch (error) {
        return error.message
    }

    return engine
}

export default useEngineIA