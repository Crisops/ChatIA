import './css/Loader.css'
import { useMessageStore } from './store/MessageStore'

const Loader = () => {

    const {progressIA, errorEngine} = useMessageStore(state => state)

    const {error, messageText} = errorEngine
    return (
        <div className="loaderVisible">
            <div aria-live="assertive" role="alert" className="loader"></div>
            <small>{ error ? messageText : progressIA}</small>
        </div>
    )
}


export default Loader