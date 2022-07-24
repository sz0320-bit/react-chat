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
            id: randomKey()
        }
        setChat(chat.concat(ret));
    }

    const initialRender = useRef(0);

    useEffect(() => {
        if (initialRender.current < 1) {
            initialRender.current += 1;
            console.log('first run')
        }else {
            console.log("update");

            chatsRef.set({
                "chats": chat
            })
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




    return (


        <>

            { user ?
                <>
        <div className={` w-screen h-[92.5%] absolute flex justify-end  flex-col py-5 `}>
            <button className={"absolute left-5 top-5"} onClick={logOut}>
                <BiLogOut className="text-2xl lg:text-3xl  textColor" />
            </button>
            {chat.map((chat) => (
            <Chat  key={chat.id} user={chat.user} text={chat.text}/>
            ))}
        </div>

        <Type onSubmit={addChat}/>
            </> :
                <Enter onClick={signWithGoogle}/>
            }
        </>
    )
}

export default Box;