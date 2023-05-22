import * as fs from "fs";
import * as util from "util";
import User from "../model/user";
import path from "path";

const filePath = '../data/users.json'

const readFileAsync = util.promisify(fs.readFile);

export const getUserById = async (id: number): Promise<User> => {
    try {
        const data = await readFileAsync(path.resolve(__dirname, filePath), 'utf-8');
        const jsonData = JSON.parse(data);
        const user = jsonData.find((user: User) => user.id === id) as User
        return user;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}
