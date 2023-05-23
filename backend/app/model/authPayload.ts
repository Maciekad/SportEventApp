import User from "./user";

interface AuthPayload {
    token: String,
    user: User;
    message: String;
}

export default AuthPayload;