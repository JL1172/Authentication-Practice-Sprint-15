import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { UserContext } from './GlobalContext';

export default function ProtectedRoute() {
    const { successMessage,closeMessage,html } = useContext(UserContext);
    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}<span onClick ={(e)=>closeMessage(e)} id = "close">close</span></Alert>}
            <h1>{html[0].protected_information}</h1>
        </div>
    )
}