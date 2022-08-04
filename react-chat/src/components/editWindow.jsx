import {motion} from "framer-motion";
import {useState} from "react";


export const EditWindow = ({window,initialName,updateName}) => {


    const [name,setName] = useState(initialName);

    const handleChange = (e) => {
        e.preventDefault();
        updateName(name);
        window();
    }

    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}
            className={`flex w-[100%] absolute h-[100%] justify-center items-center  lightglass`}>
            <div className={` h-[50%] w-[90%] shadow-2xl primary rounded-3xl flex flex-col justify-between py-5 items-center`}>
                <div className={`flex justify-center items-center border h-[85%] w-[80%] rounded-3xl`}>
                    <input type={`text`} value={name} className={`primary border font-mono text-lg text-center rounded-lg h-12 w-[90%]`} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={`flex justify-between items-center w-[80%] h-[10%] `}>
                    <input type={"button"} value={'CLOSE'} onClick={window} className={`shadow-2xl font-mono   h-fit w-[45%] py-2 bg-blue-700  rounded-xl`}/>
                    <input type={"button"} value={'SAVE'} onClick={handleChange} className={`shadow-2xl font-mono   h-fit w-[45%] py-2 bg-blue-700  rounded-xl`}/>
                </div>
            </div>
        </motion.div>
    )
}