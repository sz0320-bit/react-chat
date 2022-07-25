import firebase, {auth} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";


const Chat = ({user,text,group,name,index,cons}) => {
    const [users,load] = useAuthState(firebase.auth());

    //functions that gets the first word from a string
    const getFirstWord = (str) => {
        return str.split(" ")[0];
    }
/*<div className={`absolute mt-[-1.75em] text-[15px] text-gray-300 ${group ? 'invisible':''}`}>{getFirstWord(name)}</div>
* this is if i want to show the first name of the user
* */

    return (
        <div className={`w-screen px-2.5 ${cons && index !== 0 ? 'mt-6':''} ${index === 0 ? 'mt-auto': ''} py-1 flex gap-1 ${!group && user !==  users.uid ? 'mt-2':''} items-center ${user ===  users.uid ? 'justify-end':''}`}>
            {user !== users.uid ? <div>

                <div className={`w-8 rounded-[5em] flex justify-center items-center h-[90%] border ${group ? 'invisible':''}`}>{name[0].toUpperCase()}</div>
            </div> : null}
            <div className={`w-max h-fit py-1.5  px-5  flex justify-center items-center ${user ===  users.uid ? "bg-blue-600":"bg-gray-700 "} rounded-3xl `}>
                {text}
            </div>
            {user === users.uid ? <div>

                <div className={`w-8 rounded-[5em] flex justify-center items-center h-[90%] border ${group ? 'invisible':''}`}>{name[0].toUpperCase()}
                </div>
            </div>: null}
        </div>
    )
}

export default Chat;