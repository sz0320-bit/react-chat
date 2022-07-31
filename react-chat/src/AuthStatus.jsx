import { useEffect, useState } from 'react';
import firebase from "./firebase.js";

export const useAuthListener = () => {
    // assume user to be logged out
    const [loggedIn, setLoggedIn] = useState(false);

    // keep track to display a spinner while auth status is being checked
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        // auth listener to keep track of user signing in and out
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            }

            setCheckingStatus(false);
        });
    }, []);

    return { loggedIn, checkingStatus };
};
