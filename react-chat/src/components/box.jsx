import Chat from "./chat.jsx";
import {useEffect, useRef, useState} from "react";
import Type from "./Type.jsx";
import {Enter} from "./Enter.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase";
import {AiFillGithub} from "react-icons/all.js";
import {db,auth} from "../firebase";
import {AnimatePresence, motion} from "framer-motion";
import { query, orderBy, limit } from "firebase/firestore";
import {Route, useHistory} from "react-router-dom";
import ReactLoading from "react-loading";
import reactSvg from "../assets/react.svg";
import {uploadBytes} from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import {Sidebar} from "./Sidebar";
import SidebarButton from "./SidebarButton";
import redirect from "react-router-dom/es/Redirect.js";






const Box = () => {
    const [chat,setChat] = useState(null);
    const [loading,setLoading] = useState(true);
    const chatsRef = db.doc('chats/main');
    const mainRef = db.collection('chats');
    const bottomRef = useRef(null);
    //function that reverses an array
    const reverse = (arr) => {
        return arr.slice(0).reverse();
    }
    const [user,load] = useAuthState(auth());
    const userFetch = db.collection("users").doc(`${user.uid}`);
    const getData = async () => {


        try {

            mainRef.orderBy('createdAt', "desc").limit(50).onSnapshot((async (snapshot) => {
                let nret = [];
                await snapshot.forEach(doc => {
                    nret.push(doc.data());
                });
                setChat(reverse(nret));
                setLoading(false);
            }));
        }catch (e) {
            console.log(e);
        }

    }

    const [nameU,setName] =  useState(null);

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
                        userID: user.uid,
                        profilePic: user.photoURL,
                        name:user.displayName,
                        email:user.email,
                    });
                }
            }));
        }catch (e) {
            console.log(e);
        }

    }




    useEffect(() => {
            getData();
            getUser();
    },[]);

    useEffect(() => {
        {bottomRef.current !== null ? bottomRef.current.scrollIntoView({behavior: "smooth"}) : null}
    },[chat]);




    const addChat = (text) => {



        let nameHold = null;
        let avatarHold = null;
        {nameU !== null ? nameHold = nameU : nameHold = user.displayName}
        {avatar !== null ? avatarHold = avatar : avatarHold = user.photoURL}

        const tempKey = randomKey();
        mainRef.add({
            text: text,
            user: user.uid,
            id: tempKey,
            name:nameHold,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            avatar: avatarHold
        })
    }




    const randomKey = () => {
        const ret =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return ret;
    }






    const [show,setShow] = useState(false);



    const checkGroup = (x,y) => {
        if(y !== undefined) {
            return x === y.user;
        }else{
            return false;
        }
    }

    const checkConsecutive = (x,y) => {
        try {
            if (y === undefined || x === undefined || x === null || y === null) {
                return true;
            } else if (x.user === y.user || x.user === user.uid) {
                return false;
            } else {
                return true;
            }
        }catch (e) {
            console.log(e);
        }
    }

    const checkColBelow = (x,y) => {
        try{
        if(y === undefined || x === undefined || x === null || y === null ||x.createdAt.seconds === undefined || x.createdAt.seconds === undefined || y.createdAt.seconds === null || y.createdAt.seconds === null ) {
            return false;
        }else if(x.user === y.user){
           return x.createdAt.seconds-y.createdAt.seconds < 900
        }else{
            return false;
        }
        }catch (e) {
            console.log(e);
        }
    }

    const checkColAbove = (x,y) => {
        try{
        if(y === undefined || x === undefined || x === null || y === null ||x.createdAt.seconds === undefined || x.createdAt.seconds === undefined || y.createdAt.seconds === null || y.createdAt.seconds === null ) {
            return false;
        }else if(x.user === y.user){
            return y.createdAt.seconds-x.createdAt.seconds < 900
        }else{
            return false;
        }
        }catch (e) {
            console.log(e);
        }
    }

    const history = useHistory();


    const logOut = async () => {
        await firebase.auth().signOut()
            .then(() => {
                history.push("/login");
                console.log("logout");
            })

    }

    const timeShow = (timeX,timeY) => {
        try{
        if(timeY.createdAt.seconds === undefined || timeX.createdAt.seconds === undefined || timeX.createdAt.seconds === null || timeY.createdAt.seconds === null) {
            return false;
        }else{
            return timeX.createdAt.seconds-timeY.createdAt.seconds > 900;
        }
        }catch (e) {
            console.log(e);
        }
    }



    return (



        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}>
            <div className={`flex flex-col  absolute h-[92.5%]  w-full`}>
                <div className={`border-b-2 border-gray-700 dark:border-white shadow-2xl  flex px-3 py-1  gap-2 lg:gap-5 rounded-b-[1.5em] items-center h-fit w-full`}>
                    <div className={` w-fit ml-1 flex justify-center items-center`}>
                        <SidebarButton onClick={() => setShow(true)}/>
                    </div>
                    <div className={`w-full flex justify-center items-center px-2 gap-0.5 h-full`}>
                        <div style={{backgroundImage:`url(${reactSvg})`,backgroundSize:"80% 80%",backgroundRepeat:"no-repeat", backgroundPosition:"center"}} className={`h-12 w-12 rounded-[5em] `}></div>
                        <div className={`text-lg font-extrabold`}>Main Chat</div>
                    </div>
                    <a href={'https://github.com/sz0320-bit/react-chat'} className={` w-fit mr-1 flex justify-center items-center`}>
                        <AiFillGithub  className={`text-[2em]  lg:text-[2.5em]`} />
                    </a>
                </div>
                <div
                    className={` w-screen overflow-scroll  no-scrollbar overflow-x-hidden h-full     flex justify-start flex-col py-5 `}>

                    {!loading ?
                        <>
                            { chat !== null ? chat.map((chats, index) => (
                                <AnimatePresence key={chats.id}>
                                    <Chat key={chats.id}
                                          index={index}
                                          id={chats.id}
                                          group={checkGroup(chats.user, chat[index - 1])}
                                          cons={checkConsecutive(chats, chat[index - 1])}
                                          below={checkColBelow(chat[index + 1], chats)}
                                          above={checkColAbove(chat[index - 1], chats)}
                                          user={chats.user}
                                          name={chats.name}
                                          avatar={chats.avatar}
                                          text={chats.text}
                                          time={timeShow(chats,chat[index-1])}
                                          exactDate={chats.createdAt} />
                                </AnimatePresence>
                            )): <div className={`flex justify-center items-center h-[100%] w-[100%]`}><div>Error</div></div>}
                        </> : <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}> <ReactLoading type={'bars'} color={'white'} height={'20%'} width={'20%'} /></div>
                    }<div ref={bottomRef}/></div>

            </div>

            <Type onSubmit={addChat}/>
            <AnimatePresence>{show && <Sidebar logOut={logOut} onClick={() => setShow(!show)}/>}</AnimatePresence>
        </motion.div>


    )
}

export default Box;