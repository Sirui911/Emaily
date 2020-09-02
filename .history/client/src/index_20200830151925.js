// 使用materialize没有使用materialize UI的原因是ui需要在js中又有css又有js
//只有引入js的时候才可以不加后缀
//不需要加相对路径，因为没有相对路径的时候，会自动在module中找
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//development only axios helpers
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
  // 只有一个store在redux application中
  //The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('the environment is', process.env.NODE_ENV); 