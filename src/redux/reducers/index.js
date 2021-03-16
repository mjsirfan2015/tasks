import {combineReducers} from 'redux';
import {list} from './list'
import {tasks,loadingList} from './tasks'
const allReducers =combineReducers({
    list,
    tasks,
    loadingList,
})

export default allReducers;