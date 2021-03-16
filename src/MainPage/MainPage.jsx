import React from 'react';
import {AppBar, Box,Toolbar,Typography,List,ListItem, IconButton,ListItemText,Button,Divider,Dialog,DialogTitle,TextField, Select, MenuItem, Grid, CircularProgress} from '@material-ui/core';
import {withStyles} from '@material-ui/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite'
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import SubTask from './subtask';
import styles from './styles';
import SideBar from './sidebar'; 
import Task from './task'
import { getTask } from './functions';
import NewTaskDialog from './dialog/task';
import { connect } from 'react-redux';
import { fetchCurrListandTasks } from '../redux/thunks/currlist'

const mapStateToProps = (state) =>({
  list:state.list,
  tasks:state.tasks,
  loading:state.loadingList
});

const CategoryList = connect(mapStateToProps,{ fetchCurrListandTasks })(withStyles((theme)=>({
    progress:{
      color:theme.palette.sidebar.light,
    }
  }))(class CList extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        open:false
      }
    }
    /*componentDidMount=()=>{
      console.log("List :")
      console.log(this.props.tasks)
      if(this.props.tasks && this.state.loading){
        this.setState({loading:false});
      }
    }*/ 

    addNewTask = ()=>{
      this.setState({open:true,})
    }

    render(){  
      const {classes,list,tasks,loading,} =this.props;
      const {open} =this.state;
      if(loading)return(
        <Box width ='100%'>
          <Box width ='100%' display  ="flex" justifyContent ="center" mt={1}>
            <CircularProgress className={classes.progress} size ={30} />
          </Box>
        </Box>
      )
      
      return (
        <Box width ='100%'>
          <Button onClick={this.addNewTask}>Add new Task</Button>
          <NewTaskDialog 
          open={open} handleClose={()=>this.setState({open:false})}/>
          {tasks?tasks.map((item,index)=>
            (<List key ={index}>
              <Task task = {item}/>
            </List>)):
            null
          }
        </Box>
      )
    }
  }))
  

export default connect(mapStateToProps,{ fetchCurrListandTasks })(withStyles(styles)
(class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentList: null,
            task : null
        }
    }


    render(){
        const {classes}=this.props;
        const {list:currentList,tasks:task}=this.props;
        console.log("Tasks:")
        console.log(task)

        return(
        <React.Fragment>
        <AppBar className={classes.appBar}>
        <Toolbar>

        </Toolbar>
        </AppBar>
        <Box display="flex" mt={10} m={0}>
            <SideBar getCurrentList = {this.getCurrentList}/>
            <Box width="100%" >
              <CategoryList currentList = {currentList} list = {task} />
            </Box>
        </Box>
    </React.Fragment>
        );
    }
}));