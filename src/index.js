import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store-redux";
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';


ReactDOM.render(
<HashRouter basename={process.env.PUBLIC_URL}>
<Provider
store = {store} >
    <App />
    </Provider>
    </HashRouter>
    , document.getElementById('root')
)
;

//Убрали наш render() так как connect решает эту проблему сам
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
