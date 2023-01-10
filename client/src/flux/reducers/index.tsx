import { combineReducers} from 'redux';

import postReducer from "./posts/index";
import scrappedDataReducer from './scrappedData';
import searchInfoReducer from './searchData';

const appReducer = {
    posts: postReducer,
    scrappedData: scrappedDataReducer,
    search: searchInfoReducer
}

export default combineReducers(appReducer);