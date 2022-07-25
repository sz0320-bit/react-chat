import Chat from "./chat.jsx";
import {useEffect, useRef, useState} from "react";
import Type from "./Type.jsx";
import {Enter} from "./Enter.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase";
import {BiLogOut} from "react-icons/all.js";
import {db,auth} from "../firebase";

const Box = () => {
    const [chat,setChat] = useState([]);
    const chatsRef = db.doc('chats/main');
    const mainRef = db.collection('chats');
    const bottomRef = useRef(null);
    const getData = async () => {




        mainRef.onSnapshot(async (snapshot) => {
            await snapshot.forEach(doc => {
                setChat(doc.data().chats);
                console.log(doc.data().chats);
            });
        });


    }

    useEffect(() => {
        getData();
    },[]);

    const addChat = (text) => {
        let ret = {
            text: text,
            user: user.uid,
            id: randomKey(),
            name:user.displayName
        }
        setChat(chat.concat(ret));
    }

    const initialRender = useRef(0);

    useEffect(() => {
        if (initialRender.current < 1) {
            initialRender.current += 1;
            console.log('first run')
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        }else {
            console.log("update");

            chatsRef.set({
                "chats": chat
            })
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [chat]);

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
        }else if(x.user === y.user  || x.user === user.uid){
            return false;
        }else{
            return true;
        }
    }

    return (


        <>

            { user ?
                <>
        <div className={` w-screen overflow-scroll no-scrollbar overflow-x-hidden h-[92.5%] absolute  flex justify-start flex-col py-5 `}>
            <button className={"fixed  left-5 top-5"} onClick={logOut}>
                <BiLogOut className="text-2xl  lg:text-3xl  textColor" />
            </button>
            {chat.map((chats,index) => (
            <Chat  key={chats.id} index={index} group={checkGroup(chats.user,chat[index-1])} cons={checkConsecutive(chats,chat[index-1])} user={chats.user} name={chats.name} text={chats.text}/>
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