import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { StyledForm } from "./components/styles/StyledForm";
import { useState } from "react";
import { UserContext } from "./components/GlobalContext";

const style = { color: "rgb(25,118,210)" }

function App() {
  //state
  const nav = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage,setSuccessMessage]= useState("");

  const [spinnerOn, setSpinnerOn] = useState(false);

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  })
  //state
  //handlers for register
  const change = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value })
  }
  const submit = e => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); 
    setSpinnerOn(true);
    axios.post("http://localhost:9000/api/auth/register", inputValues).then(res => {
      nav("/protected")
      setSpinnerOn(false);
      setSuccessMessage(res.data.message); 

    }).catch(err => {
      if (err.response.data.message.error) {
        setErrorMessage([err.response.data.message.error])
      } else {
        setErrorMessage([err.response.data.message])
      }
      setSpinnerOn(false)
    })
  }
  //handlers for register
  //globalhander
  const closeMessage = e => {
    e.preventDefault();
    setSuccessMessage("");
  }
  //globalhander
  return (
    <UserContext.Provider value = {{errorMessage,spinnerOn,inputValues,change,submit,successMessage,closeMessage}}>
    <div className="App">
      <div id="headLinks">
        <Box sx={{ borderBottom: 1, borderColor: "rgb(15,25,36)" }}>
          <Tabs aria-label="basic tabs example">
            <Tab style={style} label="Home" onClick={() => nav("/")} />
            <Tab style={style} label="Login" onClick={() => nav("/login")} />
            <Tab style={style} label="Logout" onClick={() => nav("/logout")} />
            <Tab style={style} label="register" onClick={() => nav("/register")} />
            <Tab style={style} label="protected" onClick={() => nav("/protected")} />
          </Tabs>
        </Box>
      </div>
      <Routes>
        <Route path="/" element={
          <StyledForm>
            <h1 style={style}>Home Screen</h1>
          </StyledForm>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
