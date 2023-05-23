import LoginRequest from "../model/loginRequest";
import RegisterRequest from "../model/registerRequest";
import { registerUser, login } from "../services/authService";

const authResolver = {
    Mutation: {
        async registerUser(parent: any, args: RegisterRequest) {
            return await registerUser(args);
        },
        async login(parent: any, args: LoginRequest) {
            return await login(args);
        }
    },
};
export default authResolver;