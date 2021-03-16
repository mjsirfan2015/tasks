import React from 'react';
import {Box,Typography,Drawer,Button,Divider, CircularProgress} from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {withStyles,styled} from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import styles from './styles';
import { getList } from '../functions';

import { connect } from 'react-redux';
import { fetchCurrListandTasks } from '../../redux/thunks/currlist'

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
    const {classes,onClick}=props;
    return (<Button fullWidth onClick={onClick}>
    <Box width="100%" display="flex" justifyContent="flex-start" alignItems="center">
        <Box mr={1} display="flex" justifyContent="flex-start" alignItems="center">{props.children[0]}</Box>
        <Typography variant="button" className={classes.buttonText}>{props.children[1]}</Typography>
    </Box>
</Button>)
  });

  const mapStateToProps = (state) =>({
    list:state.list,
    tasks:state.tasks,
  });

const CategoryList = connect(mapStateToProps,{ fetchCurrListandTasks })(withStyles((theme)=>({
  progress:{
    color:theme.palette.sidebar.light,
  }
}))(function({classes,lists,loading,onClick,fetchCurrListandTasks}){
  const [list_rep,setListRep] = React.useState(null)
  React.useEffect(() => {
    if(lists &&list_rep==null){
      let rep={};
      for(let i = 0; i<lists.length;i++){
        const item= lists[i];
        rep[item.list_name]=rep[item.list_name]?rep[item.list_name]+1:1;
        lists[i].num = rep[item.list_name];//set count index
      }
      setListRep(rep)
    }
  });

  if(loading)return(
    <Box width ='100%'>
      <Box width ='100%' display  ="flex" justifyContent ="center" mt={1}>
        <CircularProgress className={classes.progress} size ={30} />
      </Box>
    </Box>
  )
  return (
    <Box width ='100%'>
      {lists?lists.map((item,index)=>
        (<SideBarButton key={index} onClick={()=>{fetchCurrListandTasks(item)}}>
          <ListIcon/>
          <Box>{`${item.list_name} ${item.num?item.num <= 1?'':`(${item.num})`:''}`}</Box>
        </SideBarButton>)):
        null
      }
    </Box>
  )
}));

export default connect(mapStateToProps,{ fetchCurrListandTasks })
  (withStyles(styles)(class MainPage extends React.Component{
  
    constructor(props){
    super(props);
    this.state = {
        list : null,
    }
}
setList = (value,loading=true) => (!loading?
    this.setState({list : value,}):
    this.setState({list : value})
);
componentWillMount= async()=>{
        if(this.state.list == null){
            try {
                let res = await getList();
                this.setList(res.data,false);//get category list
                if(this.props.tasks == null)
                res.data&&res.data[0]&&this.props.fetchCurrListandTasks(res.data[0])//fetch first cat.
                //as curr cat 
            } catch (error) {
                this.setList(JSON.stringify(error));
                console.log(error);
            }
        }
    }

    render(){
        const {classes}=this.props;
        const {list,} = this.state;
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
         <CategoryList lists={list} />
      </Drawer> 
      </ScopedCssBaseline>
        );
    }
}));