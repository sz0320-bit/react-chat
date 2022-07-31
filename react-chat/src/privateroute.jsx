import {Redirect, Route} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js";
import {useContext} from "react";
import ReactLoading from 'react-loading';
import {useAuthListener} from "./AuthStatus.jsx";


const PrivateRoute = ({component: Component, ...rest}) => {
    const { loggedIn, checkingStatus } = useAuthListener();
    return (

    <Route
        {...rest}
        render={props => {
            return checkingStatus ? <div className={`w-[100%] h-[100%] absolute flex justify-center items-center `}> <ReactLoading type={'bars'} color={'white'} height={'20%'} width={'20%'} /></div>
                        :<>{loggedIn ? <Component {...props} /> : <Redirect to={"/login"}/>}</>
        }
        }/>
    )
}

export default PrivateRoute;