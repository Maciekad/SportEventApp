import { useEffect, useState } from "react";
import { IAuth } from "../lib/auth";
import Login from "../model/Login";
import { signIn } from "../service/AuthService";
import { User } from "../model/User";

export const useProvideAuth = (): IAuth => {
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Hello from use Auth");
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setIsLoggedIn(true);
            setCurrentUser(user);
        }
    }, [])


    const logout = () => {
        //Remove from local storage
        localStorage.clear();
        setIsLoggedIn(false);
        setCurrentUser(undefined);
        setAuthToken(null)
    }


    const login = async (login: Login) => {
        const result = await signIn(login);
        // store user in local storage
        localStorage.setItem("user", JSON.stringify(result?.login?.user))
        setCurrentUser(result?.login?.user)
        setIsLoggedIn(true);
    }

    return { login, logout, isLoggedIn, currentUser }
}