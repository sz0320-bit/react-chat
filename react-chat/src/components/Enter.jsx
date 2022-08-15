import {auth} from "../firebase.js";
import {Link, useHistory,Redirect} from "react-router-dom";
import {useContext, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {motion} from "framer-motion";
import {MainHead} from "./head";
import {FcGoogle} from "react-icons/all.js";


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
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.5}}
                className={"h-[92.7vh] w-screen flex  justify-center items-center "}>

                <div className={"h-fit py-10 lg:w-[30em]  w-[20em] primary flex justify-center items-center shadow-2xl  rounded-2xl"}>
                        <div  onClick={signWithGoogle}  className={"bg-blue-600  h-fit w-fit px-3 text-white flex justify-center gap-2 py-2 items-center  rounded-xl  text-xl shadow"}><FcGoogle size={"40"} className={`border bg-white rounded-[5em] `}/>Log In With Google</div>
                </div>
            </motion.div>
        </>
    )
}