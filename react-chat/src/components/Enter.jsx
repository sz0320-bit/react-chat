import {auth} from "../firebase.js";
import {Link, useHistory,Redirect} from "react-router-dom";
import {useContext, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";


export const Enter = () => {
    const history = useHistory();
    const signWithGoogle = () => {
        let googleAuthProvider = new auth.GoogleAuthProvider();
        auth().signInWithPopup(googleAuthProvider)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <>
            <div className={"h-[92.7vh] w-screen flex justify-center items-center "}>
                <div className={"h-fit py-10 lg:w-[30em]  w-[20em] primary flex justify-center items-center shadow-2xl  rounded-2xl"}>
                        <input type={"button"} value={'Log in with Google'} onClick={signWithGoogle}  className={"bg-blue-600  h-10 w-fit px-7 text-white  rounded-xl text-lg shadow"}/>
                </div>
            </div>
        </>
    )
}