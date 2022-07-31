import firebase, {auth} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {motion} from "framer-motion";


const Chat = ({user,text,group,name,index,cons}) => {
    const [users,load] = useAuthState(firebase.auth());
    const pic = users.photoURL;
    //functions that gets the first word from a string
    const getFirstWord = (str) => {
        return str.split(" ")[0];
    }



/*<div className={`absolute mt-[-1.75em] text-[15px] text-gray-300 ${group ? 'invisible':''}`}>{getFirstWord(name)}</div>
* this is if i want to show the first name of the user
* */

    return (
        <motion.div
            initial={{opacity:0,scale:0.5}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.5}}
            className={`w-screen px-2.5 ${cons && index !== 0 ? 'mt-5':''} ${index === 0 ? 'mt-auto': ''} py-1 flex gap-1 ${!group && user !==  users.uid && index !== 0 ? 'mt-7':''} items-center ${user ===  users.uid ? 'justify-end':''}`}>
            {user !== users.uid ? <div>
                <div  className={`w-8 rounded-[5em] flex justify-center items-center h-7 border  ${group ? 'invisible':''}`}>{name[0].toUpperCase()}</div>
            </div> : null}
            <div className={'w-max break-all'}>
                {user !== users.uid && !group ? <div className={'absolute mt-[-1.1rem] ml-3 text-[0.75rem] text-gray-300'}>{getFirstWord(name)}</div> : null}
            <div className={`w-fit break-normal h-fit py-1.5  px-5  flex justify-center items-center ${user ===  users.uid ? "bg-blue-600":"bg-gray-700 "} rounded-3xl  `}>
                {text}
            </div>
            </div>
            {user === users.uid ? <div>

                <div  className={`w-8 rounded-[5em] flex justify-center  items-center h-7 border ${group ? 'invisible':''}`}>{name[0].toUpperCase()}
                </div>
            </div>: null}
        </motion.div>
    )
}

export default Chat;