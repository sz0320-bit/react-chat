import firebase, {db} from "../firebase.js";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {Sidebar} from "./Sidebar.jsx";
import {AnimatePresence,motion} from "framer-motion";
import SidebarButton from "./SidebarButton.jsx";
import {useHistory} from "react-router-dom";

export const UserInfo= () => {


    const [users,load] = useAuthState(firebase.auth());
    const [showSidebar,setShowSidebar] = useState(false);
    const userFetch = db.collection("users").doc(`${users.uid}`);
    const [name,setName] = useState(null);
    const [avatar,setAvatar] = useState(null);


    const getUser = async () => {

        try {

            userFetch.onSnapshot((async (snapshot) => {
                    if(snapshot.exists){
                        console.log(snapshot.data());
                        setName(snapshot.data().name);
                        setAvatar(snapshot.data().profilePic);
                    }else{
                        console.log("no data");
                        await userFetch.set({
                            userID: users.uid,
                            profilePic: users.photoURL,
                            name:users.displayName,
                            email:users.email,
                        });
                }
            }));
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getUser();
    },[]);

    const history = useHistory();

    const logOut = async () => {
        await firebase.auth().signOut()
            .then(() => {
                history.push("/login");
                console.log("logout");
            })

    }

    return(
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}>

            <div className={`absolute`}>
                <SidebarButton onClick={() => setShowSidebar(true)}/>
                <div className={"h-fit p-8  w-screen flex justify-center items-center  gap-5 flex-col"}>

                    <div style={{backgroundImage:`url(${avatar})`,backgroundSize:'cover'}} className={'h-[12em] rounded-[6em] w-[12em] border'}></div>
                    <div className={`text-[1.75em]`}>{name}</div>
                </div>
            </div>
            <AnimatePresence>{showSidebar && <Sidebar logOut={logOut} onClick={() => setShowSidebar(!showSidebar)}/>}</AnimatePresence>
        </motion.div>
    )
}