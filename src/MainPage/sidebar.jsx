import React from 'react';
import {Box,Typography,Drawer,AppBar,ToolBar,Button,Divider} from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {withStyles,styled} from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const SideBarButton=withStyles((theme)=>({
    root: {
      backgroundColor:theme.palette.sidebar.main,
      '&:hover':{
        backgroundColor:theme.palette.sidebar.light,
      },
      
    },
    buttonText:{
        color:theme.palette.text.sidebar,
    }
  }))(function(props){
    const {classes}=props;
    return (<Button>
    <Box width="100%" display="flex" justifyContent="flex-start" alignItems="center">
        <Box mr={1} display="flex" justifyContent="flex-start" alignItems="center">{props.children[0]}</Box>
        <Typography variant="button" className={classes.buttonText}>{props.children[1]}</Typography>
    </Box>
</Button>)
  });

const styles = (theme) => ({
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
export default withStyles(styles)(class MainPage extends React.Component{
    render(){
        const {classes}=this.props;
        return(
            <ScopedCssBaseline>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
      >
          <Box className={classes.titleBar}>

          </Box>
          <SideBarButton>
              <AddIcon fontSize="default" className={classes.roundIcon}/>
              <Box>New List</Box>
         </SideBarButton>
         <SideBarButton>
              <EditIcon fontSize="default"/>
              <Box>Edit List</Box>
         </SideBarButton>
         <Box mt={3} mx={1}>
            <Typography variant="h6" style={{color:"white"}}>Categories</Typography>
         </Box>
         <Divider style={{color:"white"}}/>
      </Drawer>
      </ScopedCssBaseline>
        );
    }
});