import {db,auth} from "../firebase.js";
import {useEffect} from "react";
import {useState} from "react";
import { getFirestore, doc, setDoc,updateDoc } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {SidebarChat} from "./sidebarChat";

export const Viewer = () => {
    const [loadChat,setLoadChat] = useState([]);
    const [user,load] = useAuthState(auth());
    const [Load,setLoad] = useState(true);



    const chatsUserRef = db.collection("private-chats")
        .where("users", "array-contains", auth().currentUser.uid).orderBy("lastUpdated", "desc");

    const displayChats = async () => {
        let ret = [];
        await chatsUserRef.onSnapshot(async (snapshot) => {
           snapshot.forEach( (doc1) => {
                let hold = doc1.data();
                let objId = {messageId:doc1.id};
               ret.push({...hold,...objId});
           });
           setLoadChat(ret);
              setLoad(false);

        });

    }



    useEffect(() => {
        displayChats();
    },[]);





    return (

        <div className={` h-full  rounded-xl flex flex-col   p-3  example  items-center gap-2 overflow-scroll w-[100%]`}>
            {!Load && loadChat.map((item,index) => {
                return (
                <SidebarChat key={index} users={item}/>
                )
            })}
        </div>

    )

}