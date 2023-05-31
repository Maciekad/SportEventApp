import { useState, useContext, createContext, ReactNode } from "react"
import { useProvideAuth } from "../hooks/useAuth";
import Login from "../model/Login";
import { User } from "../model/User";

export interface IAuth {
    logout: () => void;
    login: (login: Login) => Promise<void>;
    isLoggedIn: boolean,
    currentUser: User | undefined;
}

type Props = {
    children: ReactNode;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}




