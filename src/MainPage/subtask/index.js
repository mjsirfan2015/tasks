import { Box, Button, Checkbox, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import styles from '../styles';
export default withStyles(styles)((props)=>{
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