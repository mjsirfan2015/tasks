const axios = require('axios');

const access = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzOTkzMDkyLCJqdGkiOiI1MjU2OGJlYTAxNDk0NTNmYmRhYWVmMGJlN2M2OTkwNyIsInVzZXJfaWQiOiI1NTAwZmZlMi02N2VhLTQ3OTctOWU0Zi04YzljM2Q4NTVlNzIifQ.rJCnaon18gyTHjMUiJV42VtruHSqNXDDJW7UDtZ5j0A'

const refresh = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzOTkzMDkyLCJqdGkiOiI1MjU2OGJlYTAxNDk0NTNmYmRhYWVmMGJlN2M2OTkwNyIsInVzZXJfaWQiOiI1NTAwZmZlMi02N2VhLTQ3OTctOWU0Zi04YzljM2Q4NTVlNzIifQ.rJCnaon18gyTHjMUiJV42VtruHSqNXDDJW7UDtZ5j0A'
 function list(){
    console.log("Hu")

    axios.get('http://localhost:8000/list/',{
        headers: {
            Authorization : `Bearer ${access}`
        }
    }).then((res)=>console.log("Response:",res)).catch((err)=>console.log("Error:",err)) 
    
}

list()