import { createUser, getAllUsers } from "./userService";
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from "dotenv";
import AuthPayload from "../model/authPayload";
import LoginRequest from "../model/loginRequest";
import bcrypt from 'bcryptjs';
import RegisterRequest from "../model/registerRequest";
import User from "../model/user";

dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export const registerUser = async (request: RegisterRequest): Promise<AuthPayload> => {
    try {
        const users = await getAllUsers();
        const userCheck = users.find(us => us.email === request.email);

        if (userCheck) {
            throw new Error("Email already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(request.password, salt);

        const user: User = {
            id: Math.floor(Math.random() * 100),
            firstName: request.firstName,
            lastName: request.lastName,
            password: password,
            email: request.email
        };

        const newUser = await createUser(user);
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1y' });

        return { token, user: newUser, message: "Registration succesfull" };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const login = async (request: LoginRequest): Promise<AuthPayload> => {
    try {
        const users = await getAllUsers();
        const user = users.find(us => us.email === request.email);

        if (!user) {
            throw new Error('User with that email does not exist');
        }

        const isValid = await validatePassword(request.password, user.password);

        if (!isValid) {
            throw new Error('Incorrect password')
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });

        return { token, user, message: 'Succesfull login' }

    } catch (error) {
        throw error;
    }
}

export const validatePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}
