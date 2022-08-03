import {MdOutlineReadMore} from "react-icons/all.js";
import {motion} from "framer-motion";
import firebase from "../firebase.js";
import {useHistory} from "react-router-dom";


export const Sidebar = ({onClick,logOut}) => {

    const history = useHistory();




     return  (
         <motion.div
             className={' w-[75%]  lg:w-[20em]  md:w-[20em] h-[100%] fixed glass flex justify-center '}
             initial={{x:-300}}
             animate={{x:0}}
             exit={{x:-300}}
             transition={{
                 duration: 0.3,
                 bounce: 0
             }}>
             <button className={"absolute bg-white rounded p-0.5 text-black  top-5 w-[90%] flex justify-center"} onClick={onClick}>
                 <MdOutlineReadMore color="black"  className="text-2xl fill-black lg:text-3xl rotate "/>
             </button>
             <input type={"button"} value={'HOME'} onClick={() => history.push("/main")} className={`shadow-2xl font-mono absolute top-[5em] h-fit w-[90%] py-2 bg-blue-700 rounded-xl`}/>
             <input type={"button"} value={'PROFILE'} onClick={() => history.push("/user")} className={`shadow-2xl font-mono absolute top-[9em] h-fit w-[90%] py-2 bg-sky-700 rounded-xl`}/>
             <input type={"button"} value={'SIGN OUT'} onClick={logOut} className={`shadow-2xl font-mono absolute bottom-5 h-fit w-[90%] py-2 bg-red-700 rounded-xl`}/>

         </motion.div>
     )
}