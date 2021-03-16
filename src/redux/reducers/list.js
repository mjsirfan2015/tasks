module.exports.list = (state = null, action) => {
    switch(action.type){
       
        case "LIST_CURR":
            return action.payload;
        default:
            return state;
    }
}