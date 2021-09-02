import {File} from "../API";

const regex = /-[^\/]+\.\w+/gi;
export function getFileDescription(fileName: File): {fileName: string, extension: string} {
    const index = fileName.key?.search(regex);
    console.log(fileName.key)
    console.log('index', index);
    const fileNameName = fileName.key?.slice(index) as string;
    console.log(fileNameName);
    const fileNameExtension = fileNameName.split('\.');
    return {
        fileName: fileNameExtension[0],
        extension: fileNameExtension[1]
    }

}