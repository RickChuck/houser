import { createStore } from 'redux'
import newPropertyReducer from './reducers/newPropertyReducer'

export default createStore(newPropertyReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())