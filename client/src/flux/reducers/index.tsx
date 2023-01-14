import { combineReducers} from 'redux';

import postReducer from "./posts/index";
import scrappedDataReducer from './scrappedData';
import searchInfoReducer from './searchData';
import chatReducer from "./chats";

const appReducer = {
    posts: postReducer,
    scrappedData: scrappedDataReducer,
    search: searchInfoReducer,
    chats: chatReducer
}

export default combineReducers(appReducer);