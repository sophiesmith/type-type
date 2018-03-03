import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Boot from './containers/Boot';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase'
import location from 'redux-effects-location'
import rootReducer from './reducers'

var config = {
    apiKey: "AIzaSyAWWWyKG8mV4ffb8p80mcwfyxwj_V23oVE",
    authDomain: "typing-game-c59d3.firebaseapp.com",
    databaseURL: "https://typing-game-c59d3.firebaseio.com",
    projectId: "typing-game-c59d3",
    storageBucket: "typing-game-c59d3.appspot.com",
    messagingSenderId: "741135974190"
  };

// Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(config, {enableLogging: true}),
)(createStore)


// Create store with reducers and initial state
const store = createStoreWithFirebase(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(location(), () => next => action => next(action, console.log(action)))
  );

ReactDOM.render(
	<Provider store={store}>
		<Boot />
	</Provider>, 
	document.getElementById('root'));
registerServiceWorker();
