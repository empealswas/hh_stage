import {File} from "../API";

const fileNameRegex = /-[^/]*$/gi;
const fileExtensionRegex = /(\.[^.]+)$/gi
export function getFileDescription(fileName: File): {fileName: string, extension: string} {
    const index = fileName.key?.search(fileNameRegex) as number;
    const extensionIndex = fileName.key?.search(fileExtensionRegex) as number;
    console.log(fileName.key)
    console.log('index', index);
    const fileNameName = fileName.key?.slice(index) as string;
    console.log(fileNameName);
    const fileNameExtension = fileNameName.split('\.');
    return {
        fileName:  fileName.key?.slice(index+1, extensionIndex-1) as string,
        extension: fileName.key?.slice(extensionIndex+1)as string
    }

}