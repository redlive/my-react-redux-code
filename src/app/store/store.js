import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "../reducers/index";

const middleWare = applyMiddleware(promise(), thunk, createLogger());
export default createStore(reducer, middleWare);