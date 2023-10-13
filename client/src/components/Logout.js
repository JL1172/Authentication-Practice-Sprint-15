import { useContext, useEffect } from "react";
import Loading from "./Loading";
import { UserContext } from "./GlobalContext";

export default function Logout(props) {
    const {logoutAll} = useContext(UserContext); 

    useEffect(()=> {
       logoutAll();
    },[])//eslint-disable-line
    return (
        <div>
            <Loading />
            Logging out
        </div>
    )
}