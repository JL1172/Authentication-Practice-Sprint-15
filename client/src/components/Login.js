import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StyledForm } from './styles/StyledForm';
import { useState } from 'react';
import axios from 'axios';
import Loading from "./Loading"; 

const style = { color: "rgb(25,118,210)" }
export default function Login(props) {
    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
    })
    const [spinnerOn, setSpinnerOn] = useState(false);

    const change = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value })
    }
    const submit = e => {
        e.preventDefault();
    
        setSpinnerOn(true);
        axios.post("http://localhost:9000/api/auth/login", inputValues).then(res => {
            console.log(res)
        }).catch(err=> console.error(err))
    }
    //dont forget error in text field
    return (
        <StyledForm id="form">
            {spinnerOn ?
                <Loading /> :
                <form onSubmit={submit}>
                    <h1 style={style}>Login</h1>
                    <TextField name="username" value={inputValues.username} onChange={change} label="Username" />
                    <TextField name="password" value={inputValues.password} onChange={change} label="Password" />
                    <Button variant="contained">Submit</Button>
                </form>
            }
        </StyledForm>
    )
}