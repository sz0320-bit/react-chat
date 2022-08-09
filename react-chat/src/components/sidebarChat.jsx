import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase.js";


export const SidebarChat = ({users}) => {

    const [displayUser,setDisplayUser] = useState(null);
    const [userPfp,setUserPfp] = useState(null);
    const [userName,setUserName] = useState(null);
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
        console.log(users.message);
    },[]);

    useEffect(() => {
       console.log(displayUser);
         getUser();
    },[displayUser]);




    return (
        <div className={`rounded-2xl p-2 px-4 shadow-2xl w-full flex justify-center items-center h-[6em] flex-row m-auto primary`}>
            <div className={`w-[21%] h-[100%] flex justify-center items-center `}>
                <div style={{backgroundImage:`url(${userPfp})`,backgroundSize:"100% 100%"}} className={`h-[4em] w-[4em] rounded-[5em] `}></div>
            </div>
            <div className={`w-[79%] p-2 flex flex-col  h-[100%]`}>
                <div className={`font-bold px-1`}>{userName}</div>
                <div className={` text-gray-400 p-1 rounded-lg`}>Hello I cant talk right now</div>
            </div>
        </div>
    )
}