import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase.js";
import {useHistory} from "react-router-dom";




export const SidebarChat = ({users}) => {

    const [displayUser,setDisplayUser] = useState(null);
    const [userPfp,setUserPfp] = useState(null);
    const [userName,setUserName] = useState(null);
    const [message,setMessage] = useState(null);
    const [user] = useAuthState(auth());



    const setDisplay = async () => {
        if(users.user1 === user.uid){
            setDisplayUser(users.user2);
        }
        if(users.user2 === user.uid){
            setDisplayUser(users.user1);
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

    useEffect(() => {
        setDisplay()
    },[]);



    useEffect(() => {
         getUser();
    },[displayUser]);

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
        <div onClick={redirect} className={`rounded-2xl border border-gray-800 p-2 px-4 shadow-2xl w-full flex justify-center items-center  flex-row primary`}>
            <div className={`w-[21%] min-w-[4em] h-[100%] flex justify-center items-center `}>
                <div style={{backgroundImage:`url(${userPfp})`,backgroundSize:"100% 100%"}} className={`h-[4em] w-[4em] rounded-[5em] `}></div>
            </div>
            <div className={`w-[79%] p-2 flex flex-col  h-[100%]`}>
                <div className={`font-bold px-1`}>{userName}</div>
                <div className={` text-gray-400 p-1 rounded-lg `}>{message}</div>
            </div>
        </div>
    )
}