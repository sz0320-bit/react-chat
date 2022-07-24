import {useState, useRef} from "react";


const Type = ({onSubmit}) => {

    const [text, setText] = useState('');
    const ref = useRef(null);

    const submitTask = (e) => {
        e.preventDefault();
        onSubmit(text);
        ref.current.value = '';
    }

    return (
        <>
            <form onSubmit={submitTask} className={`w-screen  rounded-xl bg-black-500 h-[7.4%] absolute bottom-0 flex justify-evenly items-center`}>
                <input ref={ref} type={"text"} className={`border p-3 primary border-white h-10 w-[70%] rounded-3xl`}
                       onChange={(e) => setText(e.target.value) }>
                </input>
                <input type={"submit"} className={`w-20 h-fit py-0.5 border-blue-600 border flex justify-center items-center rounded-3xl bg-blue-600`}/>
            </form>
        </>
    )
 }

 export default Type;