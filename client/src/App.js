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

  const [userId,setUserId] = useState(""); 

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
      nav("/login")
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
  //handlers for login
  const submit2 = e => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); 
    setSpinnerOn(true);
    axios.post("http://localhost:9000/api/auth/login", inputValues).then(res => {
      setUserId(res.data.data);
      nav(`/protected/${res.data.data}`)
      setSpinnerOn(false);
      setSuccessMessage(res.data.message); 
      setInputValues({
        username : "",
        password : "",
      })
    }).catch(err => {
      if (err.response.data.message.error) {
        setErrorMessage([err.response.data.message.error])
      } else {
        setErrorMessage([err.response.data.message])
      }
      setSpinnerOn(false)
    })
  }

  //handlers for login
  //globalhander
  const closeMessage = e => {
    e.preventDefault();
    setSuccessMessage("");
  }

  const logoutAll = () => {
    axios.get("http://localhost:9000/api/auth/logout").then(res=> {
      nav("/"); 
    }).catch(err => console.log(err))
    .finally(()=>{
      setUserId("")
      setErrorMessage("")
      setSuccessMessage(""); 
    })
  }
  //globalhander
  const moveProc = (e) => {
    axios.get(`http://localhost:9000/api/protected`).then(res=> {
            console.log(res)
            nav(`/protected/${userId}`)
        }).catch(err => {
            console.error(err)
        })
  }
  return (
    <UserContext.Provider value = {{errorMessage,spinnerOn,inputValues,change,submit,submit2,successMessage,closeMessage,userId,logoutAll}}>
    <div className="App">
      <div id="headLinks">
        <Box sx={{ borderBottom: 1, borderColor: "rgb(15,25,36)" }}>
          <Tabs aria-label="basic tabs example">
            <Tab style={style} label="Home" onClick={() => nav("/")} />
            <Tab style={style} label="Login" onClick={() => nav("/login")} />
            <Tab style={style} label="Logout" onClick={() => nav("/logout")} />
            <Tab style={style} label="register" onClick={() => nav("/register")} />
            <Tab style={style} label="protected" onClick={(e) => moveProc(e)} />
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
        <Route path="/protected/:id" element={<ProtectedRoute />} />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
