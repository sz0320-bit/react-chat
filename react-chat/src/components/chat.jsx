import firebase, {auth, db} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {motion} from "framer-motion";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import ProfileAlt from "../assets/profileAlt.webp";


const Chat = ({user,text,group,name,index,cons,above,below,time}) => {
    const [users,load] = useAuthState(firebase.auth());
    const [avatar,setAvatar] = useState(ProfileAlt);
    const pic = avatar;
    //functions that gets the first word from a string
    const getFirstWord = (str) => {
        return str.split(" ")[0];
    }

    const cleanText = (str) => {
        //remove the \n at the start and end of the string
        return  str.trim();
    }

    const history = useHistory();

    const getAvatar = async () => {

        try {
            const userFetch = db.collection("users").doc(`${user}`);


            userFetch.onSnapshot((async (snapshot) => {
                if(snapshot.exists){
                    setAvatar(snapshot.data().profilePic);
                }else{
                    console.log("no data");
                }
            }));
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getAvatar();
    },[]);

/*<div className={`absolute mt-[-1.75em] text-[15px] text-gray-300 ${group ? 'invisible':''}`}>{getFirstWord(name)}</div>
* this is if i want to show the first name of the user
* */

    return (
        <motion.div

            initial={{opacity:0,scale:0.5}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.5}}
            className={`w-full  px-2.5 ${cons && index !== 0 ? 'mt-5':''}   ${index === 0 ? 'mt-auto': ''}   ${above || below ? 'py-0.5' : 'py-1'} flex gap-1 ${!group && user !==  users.uid && index !== 0 ? 'mt-7':''} ${!group && user ===  users.uid && index !== 0 ? 'mt-1':''} items-center ${user ===  users.uid ? 'justify-end':''}`}>
            {user !== users.uid ? <div>
                {avatar ? <div onClick={() => history.push(`/profile/${user}`)}  className={`w-8  rounded-[5em] flex justify-center items-center h-8 border  ${group ? 'invisible':''}`} style={{backgroundImage:`url(${avatar})`, backgroundSize:'100% 100%'}}></div>
                    :
                    <div onClick={() => history.push(`/profile/${user}`)}  className={`w-8 rounded-[5em] flex justify-center items-center h-7 border  ${group ? 'invisible':''}`}>{name[0].toUpperCase()}</div>
                }
            </div> : null}
            <div className={'w-max  max-w-[75%] break-all'}>
                {user !== users.uid && !group ? <div className={' mt-[-1.1rem] ml-3 text-[0.75rem] text-gray-300'}>{getFirstWord(name)}</div> : null}
            <div className={`w-full   breakNormal whitespace-pre-wrap  h-fit py-1.5 ${above && user ===users.uid && 'rounded-tr-[5px]'} ${below && user ===users.uid && 'rounded-br-[5px]'} ${above && user !==  users.uid && 'rounded-tl-[5px]'} ${below && user !==  users.uid && 'rounded-bl-[5px]'}  px-5  flex flex-row justify-center items-center ${user ===  users.uid ? "bg-blue-600":"bg-gray-700 "} rounded-3xl  `}>
                {
                    cleanText(text).split('\n\n').map((line, i) => (
                        <>
                            {line}
                            <br/>
                        </>
                    ))
                }
            </div>
            </div>
            {user === users.uid ? <div>
                {pic ? <div onClick={() => history.push(`/profile/${user}`)}  className={`w-8 rounded-[5em] flex justify-center items-center h-8 border  ${group ? 'invisible':''}`} style={{backgroundImage:`url(${pic})`, backgroundSize:'100% 100%'}}></div>
                    :
                    <div onClick={() => history.push(`/profile/${user}`)}  className={`w-8 rounded-[5em] flex justify-center items-center h-7 border  ${group ? 'invisible':''}`}>{name[0].toUpperCase()}</div>
                }
            </div>: null}
        </motion.div>
    )
}

export default Chat;