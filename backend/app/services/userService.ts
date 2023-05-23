
import User from "../model/user";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileUtils";

const filePath = '../data/users.json'

export const createUser = async (user: User): Promise<User> => {
    try {
        await writeJsonFile(path.resolve(__dirname, filePath), user)
        return user;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        throw error;
    }
}

export const getUserById = async (id: Number): Promise<User> => {
    try {
        const jsonData = await readJsonFile(path.resolve(__dirname, filePath));
        const user = jsonData.find((user: User) => user.id === id)
        return user;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await readJsonFile(path.resolve(__dirname, filePath)) as User[];
        return users;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}