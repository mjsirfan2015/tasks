module.exports ={
    curr_list : (data)=>{
        return {
            type: 'LIST_CURR',
            payload: data
        }
    },
    curr_task : (data)=>{
        return {
            type: 'TASKS_CURR',
            payload: data
        }
    },
    loadingList : ()=>{
        return {
            type : 'LOAD_LIST'
        }
    },
}