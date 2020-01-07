import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
import mainSaga from './saga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './reset.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,  
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
