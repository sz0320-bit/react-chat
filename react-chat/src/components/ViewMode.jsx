import React from 'react';
import {ThemeContext} from "../hooks/darkmode";
import {FaSun, FaMoon, BiLogOut} from "react-icons/all";
import {motion} from "framer-motion";

const Toggle = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    return (
        <>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={" shadow-2xl border font-mono flex justify-center items-center border   w-[90%] py-2 primary"}>
                {theme==='dark' ? (
                <FaSun fill={'orange'} className='top-navigation-icon lg:text-3xl text-2xl' />
            ) : (
                <FaMoon  fill={'navy'} className='top-navigation-icon text-blue-600 lg:text-3xl text-2xl' />
            )}</button>
</>
    );
};





export default Toggle;