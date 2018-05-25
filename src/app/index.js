import "semantic-ui-css/semantic.css";
import "./index.less";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import Routes from "./routes";
import $ from 'jquery'
import { Provider } from "react-redux";
import "./favicon.ico";
import "./components/mainToolBar/logo.png";

import { hydrate, render } from 'react-dom';

$.ajaxSetup({
    dataType: 'application/json;charset=utf-8'
});

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
    hydrate(<Provider store={store}>
        <Routes />
    </Provider>, rootElement);
} else {
    render(<Provider store={store}>
        <Routes />
    </Provider>, rootElement);
}