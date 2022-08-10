import {AiFillHome, BiMessageAdd, FaUserEdit, MdOutlineReadMore} from "react-icons/all.js";
import {motion} from "framer-motion";
import firebase from "../firebase.js";
import {useHistory} from "react-router-dom";
import {db,auth} from "../firebase";
import {useEffect, useState} from "react";
import SidebarButton from "./SidebarButton";
import {Viewer} from "./Viewer";
import {DisplayImg} from "./displayImg.jsx";
import {useAuthState} from "react-firebase-hooks/auth";


export const Sidebar = ({onClick,logOut}) => {

    const history = useHistory();
    const [show,setShow] = useState(false);
    const [username,setUser] = useState(null);
    const [user] = useAuthState(auth());

    const textUrl = db.collection('private-chats').doc(`${username}-${user.uid}`);

    function refreshPage() {
        window.location.reload(false);
    }

    const messageInit = async () => {
        console.log(`${username}-${user.uid}`)
        const userRef  = db.collection('users').doc(`${username}`);
        await userRef.get().then(async (doc) => {
           if(doc.exists){
               await textUrl.onSnapshot((async (snapshot) => {
                   if(snapshot.exists){
                       console.log('going')
                       history.push(`/chat/${username}-${user.uid}`);
                   }else{
                       const altUrl = db.doc(`private-chats/${user.uid}-${username}`);
                       altUrl.get().then((async (snapshot) => {
                           if(snapshot.exists){
                               console.log('found alt')
                               history.push(`/chat/${user.uid}-${username}`);
                               refreshPage();
                           }else{
                               console.log('creating route')
                               await textUrl.set({
                                   user1 : user.uid,
                                   user2 : username,
                                   users : [user.uid,username]
                               });
                           }
                       }));
                   }
               }));
           }else{
               alert('user does not exist');
           }
        });


    }







     return  (
         <>
         <motion.div
             className={' w-[85%]   lg:w-[25em] md:w-[20em] h-[100%] fixed glass flex flex-col  gap-4 py-4 items-center '}
             initial={{x:-300}}
             animate={{x:0}}
             exit={{x:-300}}
             transition={{
                 duration: 0.3,
                 bounce: 0
             }}>
             <button className={" h-7.5 bg-white rounded p-0.5 text-black   w-[90%] flex justify-center"} onClick={onClick}>
                 <MdOutlineReadMore color="black"  className="text-2xl fill-black lg:text-3xl rotate "/>
             </button>
             <div className={`flex flex-row  w-[90%] h-fit   items-center justify-center`}>
                <div onClick={() => history.push("/main")} className={`shadow-2xl font-mono flex justify-center items-center h-fit w-[90%] py-2 bg-blue-700 rounded-l-xl`}>
                    <AiFillHome color="white" className="text-2xl fill-white lg:text-3xl "/>
                </div>
                 <div onClick={() => history.push("/user")} className={`shadow-2xl font-mono flex justify-center items-center h-fit w-[90%] py-2 bg-sky-600 `}>
                     <FaUserEdit color="white" className="text-2xl fill-white lg:text-3xl "/>
                 </div>
                 <div onClick={() => setShow(true)} className={`shadow-2xl font-mono flex justify-center items-center h-fit w-[90%] py-2 bg-green-600 rounded-r-xl`}>
                     <BiMessageAdd color="white" className="text-2xl fill-white lg:text-3xl "/>
                 </div>
             </div>
             <Viewer/>

             <input type={"button"} value={'SIGN OUT'} onClick={logOut} className={`shadow-2xl font-mono  h-fit w-[90%] py-2 bg-red-700 rounded-xl`}/>

         </motion.div>

             {show &&
                <div  className={`h-full w-full absolute glass flex justify-center items-center`}>
                    <div className={` h-[27.5em] lg:h-[50%] w-[90%] max-w-[40em] shadow-2xl primary rounded-3xl flex flex-col justify-between py-5 items-center`}>
                        <div className={`flex justify-center items-center flex-col border h-[85%] w-[80%] rounded-3xl`}>
                            <label className={`font-mono text-xl text-center`}>UserId:</label>
                            <input type={`text`}  className={`primary border font-mono text-sm text-center rounded-lg h-12 w-[90%]`} onChange={(e) => setUser(e.currentTarget.value)} />
                        </div>
                        <div className={`flex justify-between items-center w-[80%] h-[10%] `}>
                            <input type={"button"} value={'CLOSE'} onClick={() => setShow(false)} className={`shadow-2xl font-mono   h-fit w-[45%] py-2 bg-blue-700  rounded-xl`}/>
                            <input type={"button"} value={'GO'} onClick={messageInit} className={`shadow-2xl font-mono   h-fit w-[45%] py-2 bg-blue-700  rounded-xl`}/>
                        </div>
                    </div>
                </div>
             }

         </>
     )
}