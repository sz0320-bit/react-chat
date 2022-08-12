import firebase, {db,auth} from "../firebase.js";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {Sidebar} from "./Sidebar.jsx";
import {AnimatePresence,motion} from "framer-motion";
import SidebarButton from "./SidebarButton.jsx";
import {useHistory} from "react-router-dom";
import {EditWindow} from "./editWindow";
import {uploadBytes, getDownloadURL} from "firebase/storage";
import {RouteComponentProps} from "react-router";


interface Props extends RouteComponentProps<{id : string}> {

}

export const ProfilePage= ({match}) => {


    const [showSidebar,setShowSidebar] = useState(false);
    const userFetch = db.collection("users").doc(`${match.params.id}`);
    // @ts-ignore
    const [user,load] = useAuthState(auth());
    const textUrl = db.collection('private-chats').doc(`${match.params.id}-${user.uid}`);
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
                    alert("User not found");
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




    const textReroute = async () => {
        await textUrl.onSnapshot((async (snapshot) => {
            if(snapshot.exists){
                        history.push(`/chat/${match.params.id}-${user.uid}`);
            }else{
                const altUrl = db.doc(`private-chats/${user.uid}-${match.params.id}`);
                altUrl.get().then((async (snapshot) => {
                    if(snapshot.exists){
                        history.push(`/chat/${user.uid}-${match.params.id}`);
                    }else{
                        await textUrl.set({
                            user1 : user.uid,
                            user2 : match.params.id,
                            users : [user.uid,match.params.id],
                            firstRender : true
                        });
                    }
                }));
            }
        }));
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
                        <input type={"button"} value={'TEXT'} onClick={textReroute} className={`shadow-2xl font-mono max-w-[15em] top-[9em] h-fit w-[50%] py-2 bg-blue-700  rounded-xl`}/>
                        <div className={`flex justify-center gap-2 rounded-2xl flex-col items-center  p-2`}>
                            <div className={'font-mono '}>UserID:</div>
                            <div className={`text-md border p-2 rounded-2xl`}>{match.params.id}</div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>{showSidebar && <Sidebar logOut={logOut} onClick={() => setShowSidebar(!showSidebar)}/>}</AnimatePresence>
            </motion.div>
        </>
    )
}