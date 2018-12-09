import { combineReducers, compose, createStore } from 'redux';
import * as reducers from './reducers';

const reducer = combineReducers({ ...reducers } as any);

const store = createStore(
  reducer,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;
