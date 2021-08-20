import React from "react";
// Import the useDropzone hooks from react-dropzone
import {DropzoneOptions, useDropzone} from "react-dropzone";

const FilesUploadDropzone = ({onDrop, accept}: DropzoneOptions) => {
    // Initializing useDropzone hooks with options
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept
    });

    const getClassName = (className: string, isActive: boolean) => {
        if (!isActive) return className;
        return `${className} ${className}-active`;
    };

    return (
        <div className={getClassName('dropzone', isDragActive)} style={{
            width: '100%',
            height: '10vh',
            boxSizing: 'border-box',
            border: '1px solid #969696',
            background: 'rgba(124,191,255,0.22)',
            borderRadius: 5,
            textAlign: 'center',
        }} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center" style={{padding: 10}}>
                {isDragActive ? (
                    <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                    <p className="dropzone-content">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
        </div>
    );
};

export default FilesUploadDropzone;