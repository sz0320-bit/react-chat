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


function LogOut({onClick}) {
    return <button className={"fixed bg-white rounded p-0.5 text-black left-5 top-5"} onClick={onClick}>
        <MdOutlineReadMore color="black" className="text-2xl fill-black lg:text-3xl "/>
    </button>;
}


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


    const [show,setShow] = useState(false);



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
            { user  ?

                <>

                        <div>
                            <div
                                className={` w-screen overflow-scroll  no-scrollbar overflow-x-hidden h-[92.5%]  absolute  flex justify-start flex-col py-5 `}>
                                <LogOut onClick={() => setShow(true)}/>
                                {chat.map((chats, index) => (
                                    <Chat key={chats.id}
                                          index={index}
                                          id={chats.id}
                                          group={checkGroup(chats.user, chat[index - 1])}
                                          cons={checkConsecutive(chats, chat[index - 1])}
                                          user={chats.user}
                                          name={chats.name}
                                          text={chats.text}/>
                                ))}
                                <div ref={bottomRef}/>
                            </div>

                            <Type onSubmit={addChat}/>
                            <AnimatePresence>{show && <motion.div
                                className={' w-[75%] lg:w-[20em] md:w-[20em] h-[100%] fixed glass flex justify-center '}
                                initial={{x:-300}}
                                animate={{x:0}}
                                exit={{x:-300}}
                                transition={{
                                    duration: 0.3,
                                    bounce: 0
                                }}>
                                <button className={"absolute bg-white rounded p-0.5 text-black  top-5 w-[90%] flex justify-center"} onClick={() => setShow(!show)}>
                                    <MdOutlineReadMore color="black"  className="text-2xl fill-black lg:text-3xl rotate "/>
                                </button>
                                <input type={"button"} value={'SIGN OUT'} onClick={logOut} className={`shadow-2xl font-mono absolute bottom-5 h-fit w-[90%] py-2 bg-red-700 rounded-xl`}/>

                            </motion.div>}</AnimatePresence>
                        </div>
                </> :
                <Enter onClick={signWithGoogle}/>
            }
        </>
    )
}

export default Box;