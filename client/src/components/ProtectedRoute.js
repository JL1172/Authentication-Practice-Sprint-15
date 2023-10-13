import Alert from '@mui/material/Alert';
import { useContext, useEffect } from 'react';
import { UserContext } from './GlobalContext';
import axios from 'axios';


export default function ProtectedRoute() {
    const { successMessage,closeMessage } = useContext(UserContext);

    useEffect(()=> {
        axios.get(`http://localhost:9000/api/protected`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },[])//eslint-disable-line

    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}<span onClick ={(e)=>closeMessage(e)} id = "close">close</span></Alert>}
        </div>
    )
}