import { User } from "./User";

interface AuthPayload {
    token: String,
    user: User;
    message: String;
}

export default AuthPayload;