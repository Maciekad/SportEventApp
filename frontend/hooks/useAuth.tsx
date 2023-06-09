import { useEffect, useState } from "react";
import { IAuth } from "../lib/auth";
import Login from "../model/Login";
import { signIn } from "../service/AuthService";
import { User } from "../model/User";
import { useToast } from "@chakra-ui/react";

export const useProvideAuth = (): IAuth => {
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toast = useToast()

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

        toast({
            title: 'Success.',
            description: "You were succesfully logged out.",
            status: 'success',
            duration: 3000
        })
    }


    const login = async (login: Login) => {
        const result = await signIn(login);
        // store user in local storage
        localStorage.setItem("user", JSON.stringify(result?.login?.user))
        setCurrentUser(result?.login?.user)
        setIsLoggedIn(true);

        toast({
            title: 'Success.',
            description: "You were succesfully logged in.",
            status: 'success',
            duration: 3000
        })
    }

    return { login, logout, isLoggedIn, currentUser }
}