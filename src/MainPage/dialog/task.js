import React from 'react';
import styles from '../styles';
import { Box, Dialog, DialogTitle, Grid, MenuItem, Select, TextField, Typography, withStyles, IconButton ,Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import dateformat from 'dateformat';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import { addTask } from '../functions';
import { connect } from 'react-redux';
import { fetchCurrListandTasks } from '../../redux/thunks/currlist'

const mapStateToProps = (state) =>({
    list:state.list,
    tasks:state.tasks,
  });

export default connect(mapStateToProps,{ fetchCurrListandTasks })
(withStyles(styles)((props)=>{
    const {classes,list} = props;
    const { handleClose, selectedValue, open } = props;
    const [value, setValue] = React.useState(0);
    const [datetime,setDatetime]=React.useState(null)//new Date(Date.now())                                                                                  );
    const [timeOpen,setTimeOpen]=React.useState(0);
    const [title,setTitle] = React.useState('');
    const [desc,setDesc] = React.useState('');
    const handleChange = (event) => {//on clicking date selection box
        setValue(event.target.value);
        //alert(0);
        switch(event.target.value){
            case 0://No Date
                setDatetime(null);
                setTimeOpen(0);
                break;
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
    const createTask = ()=>{
        console.log(`
            list_id : ${JSON.stringify(list&&list.list_id)}
            title   : ${title}
            desc    : ${desc}
           date due : ${datetime} 
        `);
        try {
            addTask(props.list.list_id,title,desc,datetime);//add new task to db
            props.fetchCurrListandTasks(list);//update task info
            handleClose();//close dialog
        } catch (error) {
            console.log(error);
        }
       
    }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
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
                    }}
                    onChange = {(e)=>setTitle(e.target.value)}
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="caption" color="initial">Description</Typography>
                    <TextField placeholder="Description"
                    fullWidth={true}
                    inputProps={{
                        className:classes.input,
                    }}
                    onChange = {(e)=>setDesc(e.target.value)}
                    ></TextField>
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
            <Grid item xs={12}>
                <Box width = '100%' my={2}>
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={createTask} 
                    fullWidth>Create</Button>  
                </Box>
                
            </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
}));
