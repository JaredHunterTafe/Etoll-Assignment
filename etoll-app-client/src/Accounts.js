import React,{useState,useEffect} from 'react'; 
import NewAccount from './NewAccount'

export default function Users(){

    const [users,setUsers] = useState([]); 

    useEffect(()=>{
        fetch('http://localhost:4000/api/info')
            .then(response => response.json())
            .then(data=> setUsers(data)); 
    },[]); 


    function addUser(u){
        setUsers([...users,u]); 
    }

    return(
        <div style={{border:'1px solid red',padding:'5px',margin:'5px'}}>
            <NewAccount addUser={addUser}/>
            <p>There are {users.length} Accounts</p>
        </div>
    ); 
}