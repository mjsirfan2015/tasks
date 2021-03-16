import React from 'react';
import MainPage from './MainPage/MainPage'
import {ThemeProvider,createMuiTheme} from '@material-ui/core'
import 'fontsource-roboto';
import { fade } from '@material-ui/core/styles/colorManipulator';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';


export default function App(){
    const theme=createMuiTheme({
        palette:{
            sidebar:{
                main: '#363636',
                light:'#5e5e5e',
              },
              divider:fade('#ffffff',0.5),
              text:{
                  sidebar:'#ffffff'
              }
        }
    });

    
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <ThemeProvider theme={theme}>
        <MainPage />   
     </ThemeProvider>
     </MuiPickersUtilsProvider>
    )
}