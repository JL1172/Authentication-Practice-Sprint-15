import Alert from '@mui/material/Alert';
import { useContext, useEffect } from 'react';
import { UserContext } from './GlobalContext';

export default function ProtectedRoute() {
    const { successMessage,closeMessage } = useContext(UserContext);
    useEffect(()=> {
        
    },[])
    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}<span onClick ={(e)=>closeMessage(e)} id = "close">close</span></Alert>}
        </div>
    )
}