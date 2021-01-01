import React from 'react';
import {AppBar, Box,Toolbar,Typography,List,ListItem, IconButton,ListItemText,Button,Divider,Dialog,DialogTitle,TextField, Select, MenuItem, Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/styles'
import SideBar from './sidebar.jsx'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite'
import Checkbox from '@material-ui/core/Checkbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import dateformat from 'dateformat';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
const styles=theme=>({
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
    }
});

const NewTaskDialog=withStyles(styles)((props)=>{
    const {classes} = props;
    const { handleClose, selectedValue, open } = props;
    const [value, setValue] = React.useState(0);
    const [datetime,setDatetime]=React.useState(new Date(Date.now())                                                                                  );
    const [timeOpen,setTimeOpen]=React.useState(0);
    const handleChange = (event) => {//on clicking date selection box
        setValue(event.target.value);
        switch(event.target.value){
            case 1://Today
                setTimeOpen(1);
                break;
            case 2://Tommorrow
                setTimeOpen(1);
                break;
            case 3://custom
                setTimeOpen(2);
                break;
        }
    };

    const handleDateChange=(date)=>{//set datetime value for task
        //dateformat(new Date(0),"HH:MM ddd mmm dd/yy")
        date=new Date(date).getTime();
        console.log(new Date(date),date%(24*1000*3600));
        switch(value){
            case 1://set todays date with given time 
                setDatetime(new Date(date));
                setValue(4);
                break;
            case 2://set tommorrow's Date with given time
                date=date+24*3600*1000;//find tommorrow's time
                setDatetime(new Date(date));
                setValue(4);
                break;
            case 3://set custom datetime
                setDatetime(new Date(date));
                setValue(4);
                break;
        }
        console.log(value,new Date(date));
    }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle id="simple-dialog-title">
            <Box display="flex" alignItems="center" mt={-2}>
                    <Box flexGrow={1}>Create new Task</Box>
                    <IconButton onClick={handleClose}><CloseIcon/>
                    </IconButton>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="caption" color="initial">Task Name</Typography>
                    <TextField placeholder="Task Name"
                    fullWidth={true}
                    inputProps={{
                        className:classes.input,
                    }}></TextField>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="caption" color="initial">Description</Typography>
                    <TextField placeholder="Description"
                    fullWidth={true}
                    inputProps={{
                        className:classes.input,
                    }}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" color="initial">Due</Typography>
                    <Select
                    fullWidth={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                        onChange={handleChange}
                >
                    <MenuItem value={0}>No Date</MenuItem>
                    <MenuItem value={1}>Today</MenuItem>
                    <MenuItem value={2}>Tommorrow</MenuItem>
                    <MenuItem value={3}>Custom</MenuItem>
                    {value!=0?<MenuItem value={4}>{dateformat(datetime,"HH:MM ddd mmm dd/yy")}</MenuItem>:null}
                </Select>
                <div>
                <TimePicker
                    open={timeOpen==1}
                    onOpen={() => setTimeOpen(1)}
                    onClose={() => setTimeOpen(0)}
                    value={new Date(Date.now())}
                    onChange={handleDateChange}
                    TextFieldComponent={() => null}
                />
                </div>
                <div>
                    <DateTimePicker
                        open={timeOpen==2}
                        onOpen={() => setTimeOpen(2)}
                        onClose={() => setTimeOpen(0)}
                        value={new Date(Date.now())}
                        onChange={handleDateChange}
                        TextFieldComponent={() => null}
                    />
                </div>
            </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
});

const SubTask=withStyles(styles)((props)=>{
    const {classes}=props;
    const[width,setWidth]=React.useState(null);
    const lref=React.createRef();
    React.useEffect(()=>{
        const width=lref.current.getBoundingClientRect().width;
        setWidth(width);
    })
    return(
        <Box className={classes.subtask} ref={lref} ml={3} mr={2} pt={0.8} pb={1}>
            <Box display="flex" alignItems="center">
                <Box px={1.5}>
                    <Checkbox icon={<AssignmentIcon />} checkedIcon={<AssignmentTurnedInIcon />}/>
                </Box>
                <Box flexGrow={1}>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        <Box display="flex">
                            <Typography  variant="body1" color="initial" width="100%" style={{maxWidth:width*0.9,overflowWrap:"break-word",wordWrap:"break-word"}}>                            
                            Groceries
                            </Typography>
                        </Box>
                        <Button variant="outlined">
                            5:30 Dec 5/20
                        </Button>
                    </Box>
                    <Box >
                        <Typography variant="body2" color="initial">Due in 5hrs</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
});
const Task=withStyles(styles)((props)=>{
    const {classes}=props;
    const[width,setWidth]=React.useState(null);
    const [open,setOpen]=React.useState(false);
    const lref=React.createRef();
    React.useEffect(()=>{
        const width=lref.current.getBoundingClientRect().width;
        setWidth(width);
    })
    return(
        <ListItem className={classes.task} ref={lref} >
            
            <Box display="flex" width="100%"alignItems="center">
                <Box flexGrow={1}>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        <Box display="flex">
                            <Typography  variant="body1" color="initial" width="100%" style={{maxWidth:width*0.9,overflowWrap:"break-word",wordWrap:"break-word"}}>                            
                            Groceries
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                        </Box>
                        <Button variant="outlined"  onClick={()=>setOpen(true)}>
                            5:30 Dec 5/20
                        </Button>
                        <NewTaskDialog open={open} handleClose={()=>setOpen(false)}/>
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
});
export default withStyles(styles)(class MainPage extends React.Component{
    
    render(){
        const {classes}=this.props;
        return(
        <React.Fragment>
        <AppBar className={classes.appBar}>
        <Toolbar>

        </Toolbar>
        </AppBar>
        <Box display="flex" mt={10} m={0}>
            <SideBar/>
            <Box width="100%" >
                <List>
                    <Task/>
                    {[...Array(15).keys()].map(()=><SubTask/>)}
                </List>
                
            </Box>
        </Box>
    </React.Fragment>
        );
    }
});