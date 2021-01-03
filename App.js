import 'react-native-gesture-handler'
import React from 'react';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './src/redux/reducers'
import AppMain from './AppMain';

const App=()=>{
  const store = createStore(Reducers,{},applyMiddleware(ReduxThunk))
  return (
    <Provider store={store}>
      <AppMain/>
    </Provider>
  )
}

export default App