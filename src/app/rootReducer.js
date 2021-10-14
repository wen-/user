import { combineReducers } from "redux";
import testReducer from '../model/test';

export default combineReducers({
    test: testReducer,
});
