import firebase, {auth} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";


const Chat = ({user,text}) => {
    const [users,load] = useAuthState(firebase.auth());
    return (
        <div className={`w-screen px-5 py-1 flex ${user ===  users.uid ? 'justify-end':''}`}>
            <div className={`w-max h-fit py-1.5  px-5  flex justify-center items-center ${user ===  users.uid ? "bg-blue-600":"bg-gray-700 "} rounded-3xl `}>
                {text}
            </div>
        </div>
    )
}

export default Chat;