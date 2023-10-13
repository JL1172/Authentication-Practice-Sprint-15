import { StyledForm } from "./styles/StyledForm";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Loading from "./Loading";
import Alert from '@mui/material/Alert';
import { useContext } from "react";
import {UserContext} from "./GlobalContext"; 

const style = {color : "rgb(25,118,210)"}
export default function Register(props) {
const {errorMessage,spinnerOn,submit,change,inputValues} = useContext(UserContext);
 

    //dont forget error in text field
    return (
        <StyledForm id="form">
            {spinnerOn ? 
                <Loading /> :
                <form onSubmit={e=> e.preventDefault()}>
                    <h1 style={style}>Register</h1>
                    <TextField name="username" value={inputValues.username} onChange={change} label="Username" />
                    <TextField name="password" value={inputValues.password} onChange={change} label="Password" />
                    <Button variant="contained" onClick={submit}>Submit</Button>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </form>}
        </StyledForm>
    )
}