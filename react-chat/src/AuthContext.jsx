import React, {useContext} from "react";
import firebase, {auth} from "./firebase.js";
import {useEffect} from "react";

export const AuthContext = React.createContext();



export const AuthProvider = ({children}) => {

    const [user, setUser] = React.useState(null);

    useEffect(() => {
         auth().onAuthStateChanged(setUser);
    },[]);

    const value = {
        user
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}