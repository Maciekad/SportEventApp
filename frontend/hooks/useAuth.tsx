import { useContext, useEffect, useState } from "react";
import { AuthContext, IAuth } from "../lib/auth";
import Login from "../model/Login";
import { signIn } from "../service/AuthService";
import { User } from "../model/User";
import { log } from "console";

export const useProvideAuth = (): IAuth => {
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState<User>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log("Hello from use Auth");
        const loggedInUser = localStorage.getItem("user");

        console.log(isLoggedIn)
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
        setAuthToken(null)
    }



    const login = async (login: Login) => {
        const result = await signIn(login);

        // store user in local storage
        localStorage.setItem("user", JSON.stringify(result?.login?.user))

        setIsLoggedIn(true);

        console.log(result?.login?.user)
        setCurrentUser(result?.login?.user)


    }

    return { login, logout, currentUser }
}