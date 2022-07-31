import {Enter} from "./components/Enter.jsx";
import Box from "./components/box.jsx";
import {auth} from "./firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "./firebase.js";
import {Switch, Route, Router, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./privateroute.jsx";
import {AuthProvider} from "./AuthContext.jsx";
import {LandingRoute} from "./components/LandingRoute.jsx";

export const App = () => {


    const [user,load] = useAuthState(auth());

return (
    <>
        <BrowserRouter>
        <Switch>
            <Route path={"/"} exact component={LandingRoute}/>
            <Route exact path={"/login"} component={Enter}/>
            <PrivateRoute exact userIs={true} path={"/main"} component={Box}/>}
        </Switch>
    </BrowserRouter>

    </>
)
}

