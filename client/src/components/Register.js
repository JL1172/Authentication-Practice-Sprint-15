import { StyledForm } from "./styles/StyledForm";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {color : "rgb(25,118,210)"}
export default function Register(props) {
    return (
        <StyledForm id="form">
            <form>
                <h1 style={style}>Register</h1>
                <TextField label="Username" />
                <TextField label="Password" />
                <Button variant="contained">Submit</Button>
            </form>
        </StyledForm>
    )
}