import {Typography} from "@mui/material";
import React, {ReactNode, useMemo} from "react";
// Import the useDropzone hooks from react-dropzone
import {DropzoneOptions, useDropzone} from "react-dropzone";
import '../../utils/dropzone.css'

type FilesUploadDropzoneWithChildrenProps = {
    dropzone: DropzoneOptions,
    children?: ReactNode
}


const FilesUploadDropzoneWithChildren = (props: FilesUploadDropzoneWithChildrenProps) => {
    const {onDrop, accept} = {...props.dropzone}
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept,
    });

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };
    const style: any = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const getClassName = (className: string, isActive: boolean) => {
        if (!isActive) return className;
        return `${className}-active`;
    };

    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div className="text-center" style={{padding: 20}}>
                {props.children}
            </div>
        </div>

    );
};

export default FilesUploadDropzoneWithChildren;