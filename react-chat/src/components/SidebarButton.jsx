import {MdOutlineReadMore} from "react-icons/all.js";


export default function SidebarButton({onClick}) {
    return <button className={"fixed bg-white rounded p-0.5 text-black left-5 top-5"} onClick={onClick}>
        <MdOutlineReadMore color="black" className="text-2xl fill-black lg:text-3xl "/>
    </button>;
}