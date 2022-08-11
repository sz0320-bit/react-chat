import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase.js";
import {useHistory} from "react-router-dom";
import {motion,AnimatePresence} from "framer-motion";
import ReactLoading from "react-loading";


export const SidebarChat = ({users}) => {

    const [displayUser,setDisplayUser] = useState(null);
    const [homeUser,sethomeUser] = useState(null);
    const [userPfp,setUserPfp] = useState(null);
    const [notif,setNotif] = useState(false);
    const [userName,setUserName] = useState(null);
    const [message,setMessage] = useState(null);
    const [user] = useAuthState(auth());



    const setDisplay = async () => {
        if(users.user1 === user.uid){
            setDisplayUser(users.user2);
            sethomeUser('user1');
        }
        if(users.user2 === user.uid){
            setDisplayUser(users.user1);
            sethomeUser('user2');
        }
    }

    const getUser = async () => {

        try {
            const userFetch = db.collection("users").doc(`${displayUser}`);
            const messageRef = db.collection(`private-chats/${users.messageId}/messages`).orderBy("createdAt", "desc").limit(1);

            messageRef.onSnapshot((async (snapshot) => {
               snapshot.forEach(doc => {
                 setMessage(doc.data().text);
               });
            }));

            userFetch.onSnapshot((async (snapshot) => {
                if(snapshot.exists){
                    setUserName(snapshot.data().name);
                    setUserPfp(snapshot.data().profilePic);
                }else{
                    console.log("no data");
                }
            }));
        }catch (e) {
            console.log(e);
        }

    }


    const getNotifs = () => {
        if(homeUser === 'user1'){
            const ref =  db.doc(`private-chats/${users.messageId}`);
            ref.onSnapshot(async(doc) => {
                if(doc.data().user1LastView < doc.data().user2LastUpdate){
                    setNotif(true);
                    console.log('ult 1')
                }else if(doc.data().user1LastView >= doc.data().user2LastUpdate){
                    setNotif(false);
                    console.log('ult 2')
                }else{
                    setNotif(false);
                    console.log('ult 3')
                }
                
            })
        }else{
            const ref =  db.doc(`private-chats/${users.messageId}`);
            ref.onSnapshot(async(doc) => {
                if(doc.data().user2LastView < doc.data().user1LastUpdate){
                    setNotif(true);
                }
                else if(doc.data().user2LastView >= doc.data().user1LastUpdate){
                    setNotif(false);
                }else{
                    setNotif(false);
                }
            })
        }
    }

    useEffect(() => {
        setDisplay();
        getNotifs();
    },[]);



    useEffect(() => {
         getUser();
    },[displayUser]);

    useEffect(() => {
        getNotifs();
    },[homeUser])

    function refreshPage() {
        window.location.reload(false);
    }

    const redirect = () => {
        history.push(`/`);
        history.push(`/chat/${users.messageId}`);
        refreshPage();
    }


    const history = useHistory();

    return (
        <>
        <motion.div
            initial={{y:-200}}
            animate={{y:0}}
            exit={{y:-200}}
            transition={{duration:0.15}}
            onClick={redirect} className={`rounded-2xl border-2  ${notif && users.user1 !== users.user2 ? 'border-r-red-800 border-r-8 border-gray-800':'border-gray-800'} p-2 px-4 shadow-2xl w-full  flex justify-center items-center  flex-row primary`}>
            {userPfp && userName && message ?
                <>
                <div className={`w-[21%] min-w-[4em] h-[100%] flex justify-center items-center `}>
                <div  style={{backgroundImage:`url(${userPfp})`,backgroundSize:"100% 100%"}} className={`h-[4em] border w-[4em] rounded-[5em] `}></div>
            </div>
            <div className={`w-[79%] p-2 flex flex-col  h-[100%]`}>
                <div className={`font-bold px-1`}>{userName}</div>
                <div className={` text-gray-400 p-1 rounded-lg `}>{message}</div>
            </div>
            </>
            : <ReactLoading type={'spin'} color={'white'} height={'100%'} width={'20%'} />}
        </motion.div>
        </>
    )
}