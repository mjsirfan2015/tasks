export default theme=>({
    appBar:{
        backgroundColor:theme.palette.sidebar.dark,
    },
    task:{
        border:"1px solid #aaaaaa",
        minHeight:70,
       
    },
    subtask:{
        border:"1px solid #aaaaaa",
        minHeight:70,
        boxSizing:'border-box',
        borderRadius:"25px 10px 10px 25px",
    },
    dateButton:{

    },
    input:{
        width:'100%',
    },
    vdiv:{
        borderRight: '5px solid #ebeced'
    }
});