import LoginRequest from "../model/loginRequest";
import RegisterRequest from "../model/registerRequest";
import { registerUser, login } from "../services/authService";

const authResolver = {
    Mutation: {
        registerUser: async (parent: any, args: RegisterRequest) => {
            return await registerUser(args);
        },
        login: async (parent: any, args: LoginRequest) => {
            return await login(args);
        }
    },
};
export default authResolver;