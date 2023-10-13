import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { UserContext } from './GlobalContext';
import { Link } from '@mui/material';

export default function ProtectedRoute() {
    const { successMessage,closeMessage } = useContext(UserContext);
    return (
        <div id = "proc">
            {successMessage && <Alert severity="success">{successMessage}<span onClick ={(e)=>closeMessage(e)} id = "close">close</span></Alert>}
            <h1>This is Protected Information</h1>
            <Link underline="hover" href = "http://localhost:9000/api/protected" target = "_blank" >Press To See Protected</Link>
        </div>
    )
}