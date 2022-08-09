import {db,auth} from "../firebase.js";
import {useEffect} from "react";
import {useState} from "react";
import { getFirestore, doc, setDoc,updateDoc } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {SidebarChat} from "./sidebarChat";

export const Viewer = () => {
    const [loadChat,setLoadChat] = useState([]);
    const [nonUser,setNonUser] = useState([]);
    const [user,load] = useAuthState(auth());
    const [Load,setLoad] = useState(true);



    const chatsUserRef = db.collection("private-chats")
        .where("users", "array-contains", auth().currentUser.uid);

    const displayChats = async () => {
        let ret = [];

        await chatsUserRef.onSnapshot(async (snapshot) => {
           snapshot.forEach( (doc) => {
                let hold = doc.data();
                ret.push(hold);
           });
           setLoadChat(ret);
              setLoad(false);
        });

    }



    useEffect(() => {
        displayChats();
    },[]);





    return (
        <div className={`flex w-full h-full absolute  justify-center items-center`}>
        <div className={`border h-[40em] rounded-xl flex flex-col justify-center bg-gray-500 p- items-center overflow-y-scroll w-[20em]`}>
            {!Load && loadChat.map((item,index) => {
                return (
                <SidebarChat key={index} users={item}/>
                )
            })}
        </div>
        </div>
    )

}