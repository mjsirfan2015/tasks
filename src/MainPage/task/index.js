import { Box, IconButton, ListItem, Typography, withStyles, Button, Checkbox } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import styles from '../styles';
import NewTaskDialog from '../dialog/task';
import AddIcon from '@material-ui/icons/Add';
import { delTask } from '../functions';
import dateformat from 'dateformat';

import { connect } from 'react-redux';
import { fetchCurrListandTasks } from '../../redux/thunks/currlist'

const mapStateToProps = (state) =>({
    list:state.list,
    tasks:state.tasks,
  });

export default connect(mapStateToProps,{ fetchCurrListandTasks })(withStyles(styles)((props)=>{
    const {classes,task,list,tasks}=props;
    const[width,setWidth]=React.useState(null);
    const [open,setOpen]=React.useState(false);
    const [deleted,setDeleted] = React.useState(false)
    const [checked,setChecked] =React.useState(false);
    const lref=React.createRef();
    React.useEffect(()=>{
        const width=lref.current&&lref.current.getBoundingClientRect().width;
        setWidth(width);
    })

    const handleChecked = async(e)=>{
        setChecked(e.target.checked);
        setDeleted(true);
        try {
            let del = await delTask(list.list_id,task._id);
            console.log(del);
            props.fetchCurrListandTasks(list)     
        } catch (error) {
            console.log(error);
        }
    }

    if(deleted)return null;

    return(
        <ListItem className={classes.task} ref={lref} >
            
            <Box display="flex" width="100%"alignItems="center">
                <Box ml={-2}display="flex" width={80} alignItems="center" justifyContent="center">
                    <Checkbox
                        checked={checked}
                        onChange={handleChecked}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Box>
                <Box flexGrow={1}>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        <Box display="flex">
                            <Typography  variant="body1" color="initial" width="100%" style={{maxWidth:width*0.9,overflowWrap:"break-word",wordWrap:"break-word"}}>                            
                            {task.task_name}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                        </Box>
                        <Button variant="outlined"  onClick={()=>setOpen(true)}>
                            {dateformat(task.date_due,"HH:MM ddd  dd/yy")/*mmm*/}
                        </Button>
                        {//<NewTaskDialog open={open} handleClose={()=>setOpen(false)}/>
                        }
                    </Box>
                    <Box >
                        <Typography variant="body2" color="initial">Due in 5hrs</Typography>
                    </Box>
                </Box>
                <Box mr={-2}>
                    <IconButton onClick={(event)=>{alert("event");event.stopPropagation();}}>
                        <NavigateNextIcon fontSize="large"/>
                    </IconButton>
                </Box>
            </Box>
        </ListItem>
    )
}));
