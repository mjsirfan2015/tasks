const {getList,getTask} = require('../../MainPage/functions');
const {curr_list,curr_task,loadingList} = require('../actions');
module.exports = {
    fetchCurrListandTasks : (c_list)=>{
        return async(dispatch)=>{
            try {
                const tasks = await getTask(c_list.list_id);//get tasks by list id
                dispatch(curr_list(c_list));//dispatch current list 
                dispatch(curr_task(tasks.data));//dispatch curr tasks
                dispatch(loadingList())
            } catch (error) {
                console.log(error)
            }
        }
    }
}