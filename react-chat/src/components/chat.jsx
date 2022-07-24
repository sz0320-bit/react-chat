
const Chat = ({user,text}) => {
    return (
        <div className={`w-screen px-5 py-1 flex ${user ? 'justify-end':''}`}>
            <div className={`w-max h-fit py-1.5  px-5  flex justify-center items-center ${user ? "bg-blue-600":"bg-gray-700 "} rounded-3xl `}>
                {text}
            </div>
        </div>
    )
}

export default Chat;