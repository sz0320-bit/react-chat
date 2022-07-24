import Chat from "./chat.jsx";
import {useState} from "react";
import Type from "./Type.jsx";

const Box = () => {
    const [chat,setChat] = useState([]);

    const addChat = (text) => {
        let ret = {
            text: text,
            user: true,
            id: randomKey()
        }
        setChat(chat.concat(ret));
    }

    const randomKey = () => {
        const ret =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return ret;
    }

    return (
        <>
        <div className={` w-screen h-[92.5%] absolute flex justify-end  flex-col py-5 `}>
            {chat.map((chat) => (
            <Chat  key={chat.id} user={chat.user} text={chat.text}/>
            ))}
        </div>

        <Type onSubmit={addChat}/>
        </>
    )
}

export default Box;