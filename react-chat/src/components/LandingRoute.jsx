import {Redirect, Route} from "react-router-dom";
import {useAuthListener} from "../AuthStatus.jsx";
import ReactLoading from "react-loading";


export const LandingRoute = () => {
    const { loggedIn, checkingStatus } = useAuthListener();
    return (
        <>
            {checkingStatus ? <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}>
                <ReactLoading type={'bars'} color={'white'} height={'20%'} width={'20%'} />
            </div>
                : loggedIn ?
                    <Redirect to={"/main"}/>
                    :
                    <Redirect to={"/login"}/>}
        </>
    )
}