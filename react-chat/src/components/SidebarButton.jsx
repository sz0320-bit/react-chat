import {MdOutlineReadMore} from "react-icons/all.js";


export default function SidebarButton({onClick}) {
    return <button className={" w-fit bg-white rounded p-0.5 text-black border-black border shadow-2xl"} onClick={onClick}>
        <MdOutlineReadMore color="black" className="text-2xl fill-black lg:text-3xl "/>
    </button>;
}