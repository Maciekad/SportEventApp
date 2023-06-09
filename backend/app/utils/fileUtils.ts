import * as fs from "fs";
import * as util from "util";
import Event from "../model/event";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

export const readJsonFile = async (path: string) => {
    try {
        const data = await readFileAsync(path, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

export const writeJsonFile = async (path: string, jsonData: any): Promise<void> => {
    try {
        const currentData = await readJsonFile(path);
        currentData.push(jsonData)

        const data = JSON.stringify(currentData, null, 2);
        await writeFileAsync(path, data, 'utf8')
        console.log('JSON file written successfully.');
    } catch (error) {
        console.error('Error writing JSON file:', error);
        throw error;
    }
}


export const updateJsonFile = async (path: string, jsonData: any): Promise<void> => {
    try {
        const currentData = await readJsonFile(path);

        const concatedData = currentData.concat(jsonData)

        // Get unique values from array by ID
        const updatedData = [...new Map(concatedData.map((item: Event) => [item.id, item])).values()];

        const data = JSON.stringify(updatedData, null, 2);
        await writeFileAsync(path, data, 'utf8')
        console.log('JSON file updated successfully.');
    } catch (error) {
        console.error('Error updating JSON file:', error);
        throw error;
    }
}