import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StyledForm } from './styles/StyledForm';

const style = {color : "rgb(25,118,210)"}
export default function Login(props) {
    //dont forget error in text field
    return (
        <StyledForm id = "form">
            <form>
                <h1 style={style}>Login</h1>
                <TextField  label="Username"  />
                <TextField  label="Password"  />
                <Button variant="contained">Submit</Button>
            </form>
        </StyledForm>
    )
}