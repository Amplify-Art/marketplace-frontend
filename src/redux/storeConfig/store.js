import { createStore, applyMiddleware, compose } from "redux"
import createDebounce from "redux-debounced"
import { combineReducers } from "redux"
import { history } from '../../history';
import * as reducers from '../reducers/index';
import rootSaga from '../sagas/index';
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    ...reducers
})
const middlewares = [sagaMiddleware, createDebounce()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga, { history })
export { store }
