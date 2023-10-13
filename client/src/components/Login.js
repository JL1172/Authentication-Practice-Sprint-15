import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StyledForm } from './styles/StyledForm';

import Loading from "./Loading"; 
import { Alert } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './GlobalContext';

const style = { color: "rgb(25,118,210)" }
export default function Login(props) {
    const {inputValues,spinnerOn,submit2,errorMessage,change} = useContext(UserContext);
    
    //dont forget error in text field
    return (
        <StyledForm id="form">
            {spinnerOn ?
                <Loading /> :
                <form onSubmit={(e)=>e.preventDefault()}>
                    <h1 style={style}>Login</h1>
                    <TextField name="username" value={inputValues.username} onChange={change} label="Username" />
                    <TextField name="password" value={inputValues.password} onChange={change} label="Password" />
                    <Button variant="contained" onClick={submit2}>Submit</Button>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </form>
            }
        </StyledForm>
    )
}