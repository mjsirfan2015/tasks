module.exports.tasks = (state = null, action) => {
    switch(action.type){
       
        case "TASKS_CURR":
            return action.payload;
        default:
            return state;
    }
}

module.exports.loadingList = (state = true,action) => {
    switch(action.type){
       
        case "LOAD_LIST":
            return !state;
        default:
            return state;
    }
}