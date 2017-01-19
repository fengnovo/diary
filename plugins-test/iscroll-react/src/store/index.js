import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const composedCreateStore =  compose(
    applyMiddleware(thunk)
)(createStore)

const configureStore = (initialState = {}) => {
    //store => reducers && initialState
    const store = composedCreateStore(reducers,initialState)
    return store
} 


export default configureStore