import firebase, {db} from "../firebase.js";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {Sidebar} from "./Sidebar.jsx";
import {AnimatePresence,motion} from "framer-motion";
import SidebarButton from "./SidebarButton.jsx";
import {useHistory} from "react-router-dom";
import {EditWindow} from "./editWindow";
import holdsvg from "./images.jpeg";
import {uploadBytes, getDownloadURL} from "firebase/storage";

export const UserInfo= () => {


    const [users,load] = useAuthState(firebase.auth());
    const [show,setShow] = useState(false);
    const [showSidebar,setShowSidebar] = useState(false);
    const userFetch = db.collection("users").doc(`${users.uid}`);
    const [name,setName] = useState(null);
    const [avatar,setAvatar] = useState(null);


    const getUser = async () => {

        try {

            userFetch.onSnapshot((async (snapshot) => {
                    if(snapshot.exists){
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

    const updateName = async (name) => {
        await userFetch.update({
            name:name
        });
    }

    const updateImage = async (img) => {
        const fileRef = firebase.storage().ref(`userPics/${users.uid}`);
        const uploadedRef = firebase.storage().ref(`userPics/${users.uid}_200x200`);
        uploadBytes(fileRef,img).then(async (snapshot) => {
            console.log('uploaded');
            getDownloadURL(uploadedRef).then( url => {
                userFetch.update({
                    profilePic:url
                });
            });
        });

    }




    return(
        <>



        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}>

            <div className={`absolute`}>
                <div className={`fixed top-5 left-5`}><SidebarButton onClick={() => setShowSidebar(true)}/></div>
                <div className={"h-fit p-8  w-screen flex justify-center items-center  gap-5 flex-col"}>

                    <div style={{backgroundImage:`url(${avatar})`,backgroundSize:'100% 100%'}} className={'h-[12em] rounded-[6em] w-[12em] border'}></div>
                    <div className={`text-[1.75em]`}>{name}</div>
                    <input type={"button"} value={'EDIT'} onClick={() => setShow(!show)} className={`shadow-2xl font-mono text-white max-w-[15em] top-[9em] h-fit w-[50%] py-2 bg-blue-700  rounded-xl`}/>
                    <div className={`flex justify-center gap-2 rounded-2xl flex-col items-center  p-2`}>
                        <div className={'font-mono '}>UserID:</div>
                        <div className={`text-md border primary shadow-2xl p-2 rounded-2xl`}>{users.uid}</div>
                    </div>
                </div>
            </div>
            <AnimatePresence>{showSidebar && <Sidebar logOut={logOut} onClick={() => setShowSidebar(!showSidebar)}/>}</AnimatePresence>
        </motion.div>
    <AnimatePresence>
            {show && <EditWindow window={() => setShow(!show)} initialName={name} updateName={updateName} initialImage={avatar} updateImage={updateImage}/>
        }</AnimatePresence>
        </>
    )
}