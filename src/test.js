import {connect} from 'react-redux';
import React from 'react';
import Button from '@material-ui/core/Button'
import { getList } from './MainPage/functions';
import { fetchCurrListandTasks } from './redux/thunks/currlist'
const mapStateToProps = (state) =>({
    list:state.list,
    tasks:state.tasks,
  });

const Post = connect(mapStateToProps,{ fetchCurrListandTasks })(class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list : null
        }
    }   
    componentDidMount= async()=> {
        try {
            let list = await getList();
            this.setState({list: list.data});
        } catch (error) {
            console.log("Error",error)
        }
    }
    render(){
        const { list } =this.state;
        const {list:curr_list,tasks,fetchCurrListandTasks} =this.props;
        return(
            <div>
                {list&&list[0]&&list[0].list_id}
                {list?JSON.stringify(list):null}
                <Button variant="text" color="default" onClick ={()=>{
                    list&&list[0]&&fetchCurrListandTasks(list[0])
                }}>
                  Click Here
                </Button>
                {curr_list&&JSON.stringify(curr_list)}
                <h5>Tasks</h5>
                {tasks&&JSON.stringify(tasks)}
                {}
            </div>
        );
    }
}
);
export default Post;