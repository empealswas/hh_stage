import {File} from "../API";

const fileNameRegex = /[^/]*$/gi;
const fileExtensionRegex = /(\.[^.]+)$/gi

export function getFileDescription(fileName: File): { fileName: string, extension: string } {
    const index = fileName.key?.search(fileNameRegex) as number;
    const extensionIndex = fileName.key?.search(fileExtensionRegex) as number;
    console.log(fileName.key)
    console.log('index', index);
    const fileNameName = fileName.key?.slice(index) as string;
    console.log(fileNameName);
    const fileNameExtension = fileNameName.split('\.');
    return {
        fileName: fileName.key?.slice(index, extensionIndex) as string,
        extension: fileName.key?.slice(extensionIndex + 1) as string
    }
}

export function getFileName(key: string) {
    const index = key.search(/[^/]+$/gi) as number;
    const extensionIndex = key?.search(fileExtensionRegex) as number;
    console.log(key)
    console.log('index', index);
    const keyName = key.slice(index) as string;
    console.log(keyName);
    const keyExtension = keyName.split('\.');
    return key.slice(index) as string
}