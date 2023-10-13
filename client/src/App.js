import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { StyledForm } from "./components/styles/StyledForm";

const style = {color : "rgb(25,118,210)"}
function App() {
  const nav = useNavigate();
  return (
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
        <Route path = "/" element = {
        <StyledForm>
          <h1 style ={style}>Home Screen</h1>
        </StyledForm>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
