import {Enter} from "./components/Enter.jsx";
import Box from "./components/box.jsx";
import {auth} from "./firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "./firebase.js";
import {Switch, Route, Router, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./privateroute.jsx";
import {UserInfo} from "./components/UserInfo.jsx";
import {LandingRoute} from "./components/LandingRoute.jsx";
import {ProfilePage} from "./components/profile.tsx";
import {AnimatePresence} from "framer-motion";
import {Viewer} from "./components/Viewer.jsx";
import {PrivateBox} from "./components/PrivateChat.jsx";

export const App = () => {


    const [user,load] = useAuthState(auth());


return (
    <>
        <BrowserRouter>

            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route path={"/"} exact component={LandingRoute}/>
                    <Route exact path={"/login"} component={Enter}/>
                    <PrivateRoute exact userIs={true} path={"/main"} component={Box}/>
                    <PrivateRoute exact userIs={true} path={"/user"} component={UserInfo}/>
                    <PrivateRoute exact userIs={true} path={"/profile/:id"} component={ProfilePage}/>
                    <PrivateRoute exact userIs={true} path={"/chat/:id"} component={PrivateBox}/>
                    <PrivateRoute exact userIs={true} path={"/viewer"} component={Viewer}/>
                </Switch>
            </AnimatePresence>

    </BrowserRouter>

    </>
)
}

