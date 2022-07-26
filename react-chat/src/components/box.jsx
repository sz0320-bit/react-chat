import Chat from "./chat.jsx";
import {useEffect, useRef, useState} from "react";
import Type from "./Type.jsx";
import {Enter} from "./Enter.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase";
import {BiLogOut} from "react-icons/all.js";
import {db,auth} from "../firebase";
import { query, orderBy, limit } from "firebase/firestore";

const Box = () => {
    const [chat,setChat] = useState([]);
    const chatsRef = db.doc('chats/main');
    const mainRef = db.collection('chats');
    const bottomRef = useRef(null);

    //function that reverses an array
    const reverse = (arr) => {
        return arr.slice(0).reverse();
    }

    const getData = async () => {


        try {

            mainRef.orderBy('createdAt', "desc").limit(50).onSnapshot((async (snapshot) => {
                let nret = [];
                await snapshot.forEach(doc => {
                    nret.push(doc.data());
                });
                setChat(reverse(nret));

            }));
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getData();

    },[]);

    useEffect(() => {
        {bottomRef.current !== null ? bottomRef.current.scrollIntoView({behavior: "smooth"}) : null}
    },[chat]);

    const addChat = (text) => {
        const tempKey = randomKey();
        mainRef.add({
            text: text,
            user: user.uid,
            id: tempKey,
            name:user.displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }




    const randomKey = () => {
        const ret =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return ret;
    }

    const signWithGoogle = () => {
        let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const [user,load] = useAuthState(firebase.auth());

    const logOut = () => {
        firebase.auth().signOut();
        console.log("logout");
    }


    const checkGroup = (x,y) => {
        if(y !== undefined) {
            return x === y.user;
        }else{
            return false;
        }
    }

    const checkConsecutive = (x,y) => {
        if(y === undefined){
            return true;
        }else if(x.user === y.user || x.user === user.uid){
            return false;
        }else{
            return true;
        }
    }

    return (


        <>

            { user ?
                <>
        <div className={` w-screen overflow-scroll  no-scrollbar overflow-x-hidden h-[92.5%] absolute  flex justify-start flex-col py-5 `}>
            <button className={"fixed  left-5 top-5"} onClick={logOut}>
                <BiLogOut className="text-2xl  lg:text-3xl  textColor" />
            </button>
            {chat.map((chats,index) => (
            <Chat  key={chats.id} index={index} id={chats.id} group={checkGroup(chats.user,chat[index-1])} cons={checkConsecutive(chats,chat[index-1])} user={chats.user} name={chats.name} text={chats.text}/>
            ))}
            <div ref={bottomRef}/>
        </div >

        <Type onSubmit={addChat}/>
            </> :
                <Enter onClick={signWithGoogle}/>
            }
        </>
    )
}

export default Box;