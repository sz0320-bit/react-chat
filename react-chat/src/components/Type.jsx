import {useState, useRef} from "react";
import {AnimatePresence, motion} from "framer-motion";


const Type = ({onSubmit}) => {

    const [text, setText] = useState('');
    const ref = useRef(null);

    const submitTask = (e) => {
        e.preventDefault();
        onSubmit(text)
        ref.current.innerText = '';
             ref.current.focus();
    }


    const enterHandler = (e) => {
        console.log(e);
        if (e.key === 'Enter' && ref.current.innerText === '') {
            e.preventDefault();
        }
    }

    return (
        <>
            <form onSubmit={submitTask} name={'main-form'} className={`w-full h-fit   py-3  primary rounded-xl bg-black-500 h-min-[7.4%]  absolute bottom-0 flex  items-center`}>
                <div className={'w-screen mx-3 h-fit p-1.5 primary min-h-[2.75em] border flex items-center rounded-3xl'}>

                <div contentEditable onKeyDown={(e) => enterHandler(e)}  ref={ref}  className={` px-1.5   border-none primary duration-200 outline-none md:w-[95%] lg:w-[97%] w-[80%] h-fit   rounded-3xl`}
                       onInput={(e) => setText(e.currentTarget.innerText) }>
                </div>

                    {ref.current !== null  &&
                        <><AnimatePresence>{  ref.current.innerText !== '' && ref.current.innerText !== '\n' &&

                        < motion.div

                        type={"submit"}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration:0.15}}
                        onClick={(e) => submitTask(e)}
                        className={`w-20   h-fit py-0.5 border-blue-600 border flex justify-center items-center rounded-3xl bg-blue-600`}>
                            send
                        </motion.div>

                        }</AnimatePresence>

                        </>

                    }
            </div>
            </form>
        </>
    )
 }

 export default Type;