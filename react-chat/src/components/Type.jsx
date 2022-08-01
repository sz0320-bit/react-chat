import {useState, useRef} from "react";


const Type = ({onSubmit}) => {

    const [text, setText] = useState('');
    const ref = useRef(null);

    const submitTask = (e) => {
        e.preventDefault();
        onSubmit(text);
        ref.current.innerText = '';
    }

    return (
        <>
            <form onSubmit={submitTask} className={`w-screen h-fit  rounded-xl bg-black-500 h-min-[7.4%]  absolute bottom-0 flex  items-center`}>
                <div className={'w-screen mx-3 h-fit px-1 primary border flex items-center rounded-3xl'}>
                <div contentEditable ref={ref}  className={` p-3 primary duration-200 outline-none border-none h-fit  md:w-[95%] lg:w-[97%] w-[80%] rounded-3xl`}
                       onInput={(e) => setText(e.currentTarget.innerText) }>
                </div>
                <input value={'send'} type={"submit"} className={`w-20  mr-1 h-fit py-0.5 border-blue-600 border flex justify-center items-center rounded-3xl bg-blue-600`}/>
            </div>
            </form>
        </>
    )
 }

 export default Type;