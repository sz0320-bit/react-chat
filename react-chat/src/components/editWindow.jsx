import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {DisplayImg} from "./displayImg";


export const EditWindow = ({window,initialName,updateName,updateImage, initialImage}) => {


    const [name,setName] = useState(initialName);
    const [image,setImage] = useState(initialImage);
    const [preview,setPreview] = useState(initialImage);

    const handleChange = (e) => {
        e.preventDefault()
        {initialName !== name && updateName(name)}
        {initialImage !== image && updateImage(image)}
        window();
    }

    const handleImgChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setPreview(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}
            className={`flex w-[100%] absolute h-[100%] justify-center items-center  lightglass`}>
            <div className={` h-[27.5em] lg:h-[50%] w-[90%] max-w-[40em] shadow-2xl primary rounded-3xl flex flex-col justify-between py-5 items-center`}>
                <div className={`flex justify-center items-center flex-col border h-[85%] w-[80%] rounded-3xl`}>
                    <DisplayImg key={preview} img={preview}/>
                    <input type={"file"} className={`border text-center text-sm p-2 h-min font-mono w-[90%] m-5`}  accept={"image/*"}  onChange={handleImgChange}/>
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