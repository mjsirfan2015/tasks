export default (theme) => ({
    drawer:{
        width:250,
        
    },
    drawerPaper:{
        width:'inherit',
        border:0,
        backgroundColor:theme.palette.sidebar.main,
    },
    titleBar:{
        width:250,
        minHeight:50,
        backgroundColor:theme.palette.primary.dark,
    },
    roundIcon:{
        backgroundColor:"white",
        borderRadius:"50%",
    }
});
