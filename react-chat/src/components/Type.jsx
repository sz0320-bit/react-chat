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
            <form onSubmit={submitTask} className={`w-screen  rounded-xl bg-black-500 h-[7.4%]  absolute bottom-0 flex  items-center`}>
                <div className={'w-screen mx-3 px-1 border flex items-center rounded-3xl'}>
                <input ref={ref} type={"text"} required className={` p-3 primary  outline-none border-none h-10 md:w-[95%] lg:w-[97%] w-[80%] rounded-3xl`}
                       onChange={(e) => setText(e.target.value) }>
                </input>
                <input value={'send'} type={"submit"} className={`w-20   h-fit py-0.5 border-blue-600 border flex justify-center items-center rounded-3xl bg-blue-600`}/>
            </div>
            </form>
        </>
    )
 }

 export default Type;