import React from 'react';
import ReactDOM from 'react-dom';
import './style/base.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import AppContext from './utils/appContext'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
  <AppContext.Provider value={{
    name: '小红',
    age: 18
  }}>
    <App />
  </AppContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
