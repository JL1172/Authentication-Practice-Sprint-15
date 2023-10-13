import Alert from '@mui/material/Alert';
import { useContext, useEffect } from 'react';
import { UserContext } from './GlobalContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProtectedRoute() {
    const { successMessage,closeMessage, user_id } = useContext(UserContext);
    const {id} = useParams();
    useEffect(()=> {
        axios.get(`http://localhost:9000/api/protected/${id}`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}<span onClick ={(e)=>closeMessage(e)} id = "close">close</span></Alert>}
        </div>
    )
}