import React, {ReactNode} from "react";
// Import the useDropzone hooks from react-dropzone
import {DropzoneOptions, useDropzone} from "react-dropzone";
import '../../utils/dropzone.css'

type FilesUploadDropzoneWithChildrenProps = {
    dropzone: DropzoneOptions,
    children?: ReactNode
}


const FilesUploadDropzoneWithChildren = (props: FilesUploadDropzoneWithChildrenProps) => {
    const {onDrop, accept} = {...props.dropzone}
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept,
        noClick: true
    });

    const getClassName = (className: string, isActive: boolean) => {
        if (!isActive) return className;
        return `${className}-active`;
    };

    return (
        <div className={getClassName('dropzone', isDragActive)} style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            border: '1px solid #969696',
            borderRadius: 5,
            textAlign: 'center',
        }} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center" style={{padding: 20}}>
                {props.children}
            </div>
        </div>
    );
};

export default FilesUploadDropzoneWithChildren;