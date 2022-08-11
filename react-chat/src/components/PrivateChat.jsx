import Chat from "./chat.jsx";
import {useEffect, useRef, useState} from "react";
import Type from "./Type.jsx";
import {Enter} from "./Enter.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase";
import {BiLogOut,MdOutlineReadMore} from "react-icons/all.js";
import {db,auth} from "../firebase";
import {AnimatePresence, motion} from "framer-motion";
import { query, orderBy, limit } from "firebase/firestore";
import {Route, useHistory} from "react-router-dom";
import ReactLoading from "react-loading";
import {Sidebar} from "./Sidebar";
import SidebarButton from "./SidebarButton";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";






export const PrivateBox = ({match}) => {
    const [chat,setChat] = useState(null);
    const [loading,setLoading] = useState(true);
    const [authLoad,setAuthLoad] = useState(true);
    const chatsRef = db.doc(`private-chats/${match.params.id}`);
    const mainRef = db.collection(`private-chats/${match.params.id}/messages`);
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

    const [authInit,setAuth] = useState(null);


    const authUser = () => {
        let ret = null;
        chatsRef.get().then(async (doc) => {
           const dataHold = doc.data();
           if(dataHold.user1 === user.uid || dataHold.user2 === user.uid){
               setAuth(true);
                setAuthLoad(false);
               getData();
               getUser();
           }else{
               setAuth(false);
               setAuthLoad(false);
           }
        });
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


    const setUpdate = () => {
        chatsRef.get().then(async(snapshot)=>{
            if(snapshot.data().user1 === user.uid){
                await snapshot.ref.update({
                    user1LastView: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }else{
                await snapshot.ref.update({
                    user2LastView: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }
        })
    }


    //javascript function that does something every 4 seconds



    useEffect( () => {
        authUser();
        setUpdate();
    },[]);



    useEffect(() => {
        console.log(authInit);
        console.log(user.uid);
    },[authInit]);

    useEffect(() => {
        {bottomRef.current !== null ? bottomRef.current.scrollIntoView({behavior: "smooth"}) : null}
        setUpdate();
        console.log('update');
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

        chatsRef.get().then(async (doc) => {
            await doc.ref.update({
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                
            });
            if(doc.data().user1 === user.uid){
                await doc.ref.update({
                    user1LastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
                    user1LastView: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }else{
                await doc.ref.update({
                    user2LastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
                    user2LastView: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }
        });

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
        if(y === undefined || x === undefined || x === null || y === null) {
            return true;
        }else if(x.user === y.user || x.user === user.uid){
            return false;
        }else{
            return true;
        }
    }

    const checkCol = (x,y) => {
        if(y === undefined || x === undefined || x === null || y === null) {
            return false;
        }else if(x.user === y.user){
            return true;
        }else{
            return false;
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




    return (
        <>
        {

            authLoad ? <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}> <ReactLoading type={'bars'} color={'white'} height={'20%'} width={'20%'} /></div> :


                <>
                    {

                        authInit ?

        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}>
            <div
                className={` w-screen overflow-scroll  no-scrollbar overflow-x-hidden h-[92.5%]  absolute  flex justify-start flex-col py-5 `}>
                <SidebarButton onClick={() => setShow(true)}/>
                {!loading ?
                    <>
                        { chat !== null ? chat.map((chats, index) => (
                            <AnimatePresence key={chats.id}>
                                <Chat key={chats.id}
                                      index={index}
                                      id={chats.id}
                                      group={checkGroup(chats.user, chat[index - 1])}
                                      cons={checkConsecutive(chats, chat[index - 1])}
                                      below={checkCol(chat[index + 1], chats)}
                                      above={checkCol(chat[index - 1], chats)}
                                      user={chats.user}
                                      name={chats.name}
                                      avatar={chats.avatar}
                                      text={chats.text}/>
                            </AnimatePresence>
                        )): <div className={`flex justify-center items-center h-[100%] w-[100%]`}><div>Error</div></div>}
                    </> : <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}> <ReactLoading type={'bars'} color={'white'} height={'20%'} width={'20%'} /></div>
                }
                <div ref={bottomRef}/>
            </div>

            <Type onSubmit={addChat}/>
            <AnimatePresence>{show && <Sidebar logOut={logOut} onClick={() => setShow(!show)}/>}</AnimatePresence>
        </motion.div>
                    :

                            <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}>Access Denied</div>
                    }
            </>
}
</>
    )
}