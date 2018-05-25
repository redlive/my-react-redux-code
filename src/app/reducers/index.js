import { combineReducers } from "redux";
import home from "./home";
import app from "./app";
import permissions from "./permissions";
import errorHandler from "./errorHandler";

export default combineReducers({
    home,
    app,
    errorHandler,
    permissions
});