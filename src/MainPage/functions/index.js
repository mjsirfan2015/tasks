const Axios = require('axios');

const access = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NjAyODg2LCJqdGkiOiJkNmY3N2NmNGRhNGQ0NGQ3OGEwNzQ1NTU5M2FlZjU5MyIsInVzZXJfaWQiOiI1NTAwZmZlMi02N2VhLTQ3OTctOWU0Zi04YzljM2Q4NTVlNzIifQ.e3JTWLvmOy-DylbyFEeUAPRI7Hp6PwRXHAuXmu_lAvs';

module.exports = {
    getList : () => Axios.get('http://localhost:8000/list/',{
        headers: {
            Authorization : `Bearer ${access}`
        }
    }),
    getTask : (id) => Axios.get(`http://localhost:8000/task/?cat_id=${id}`,{
        headers: {
            Authorization : `Bearer ${access}`
        }
    }),
    addTask : (id,task_name,description,date_due = null) => {
        let data={
            cat_id : id,
            task_name : task_name,
            description :description,
        };
        if(date_due){
            data.date_due = date_due;
        }
        return Axios.post(`http://localhost:8000/task/`,data,{
            
            headers: {
                Authorization : `Bearer ${access}`
            }
    })
},
    delTask : (cat_id,task_id)=>{
        let data = {
            cat_id : cat_id,
        }
        console.log(task_id)
        return Axios.delete(`http://localhost:8000/task/${task_id}/`,{
            
            headers: {
                Authorization : `Bearer ${access}`
            },
            data,
    })
    }
}