"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type fileData = {
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUploadDate: string;
};

const getFiles = async (className: string, token: string) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/files/" + className,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    console.log(response.status);
    return await response.json();
};

const downloadFile = async (
    className: string,
    token: string,
    fileName: string
) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME +
            "/api/files/" +
            className +
            "/" +
            fileName,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
    if (response.status == 200) {
        response
            .blob()
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
            })
            .catch((error) => console.error(error));
    } else console.log(await response.text());
};

const deleteFiles = async (
    className: string,
    token: string,
    fileName: string
) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME +
            "/api/files/" +
            className +
            "/" +
            fileName,
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    return [response.status, await response.text()];
};

const uploadFile = async (className: string, token: string, file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/files/" + className,
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        }
    );
    return [response.status, await response.text()];
};

export default function FileManager({
    className,
    token,
    isStudent,
}: {
    className: string;
    token: string;
    isStudent: boolean;
}) {
    const [fileList, setFileList] = useState<fileData[]>([]);
    const [selectedFile, setFile] = useState<File | null>();
    const [message, setMessage] = useState<
        { text: string; status: number } | undefined
    >();
    useEffect(() => {
        getFiles(className, token).then((response) => setFileList(response));
    }, [message]);

    return (
        <>
            {message ? (
                <p
                    className={
                        message.status == 200 || message.status == 201
                            ? "text-success"
                            : "text-danger"
                    }
                >
                    {message.text}
                </p>
            ) : (
                ""
            )}
            {!isStudent ? (
                <>
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                if (selectedFile)
                                    uploadFile(
                                        className,
                                        token,
                                        selectedFile as File
                                    ).then((mes) => {
                                        if (mes)
                                            setMessage({
                                                text: mes[1] as string,
                                                status: mes[0] as number,
                                            });
                                    });
                                else
                                    setMessage({
                                        text: "Select a file!",
                                        status: 404,
                                    });
                            }}
                        >
                            Add file
                        </button>
                        <input
                            className={`form-control ${styles.inputBox} ml-2`}
                            type="file"
                            onChange={(event) => {
                                setFile(
                                    event.target.files
                                        ? event.target.files[0]
                                        : null
                                );
                            }}
                        />
                    </div>
                </>
            ) : (
                ""
            )}
            <table className={`${styles.table} ${styles.tableTeacher}`}>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Upload Date</th>
                        <th>{""}</th>
                    </tr>
                </thead>
                <tbody>
                    {fileList &&
                        fileList.map((val, index) => {
                            return (
                                <tr
                                    key={index}
                                    onClick={() => {
                                        downloadFile(
                                            className,
                                            token,
                                            val.fileName
                                        );
                                    }}
                                >
                                    <td>{val.fileName}</td>
                                    <td>{val.fileType.split("/")[1]}</td>
                                    <td>
                                        {(val.fileSize / 1000000).toFixed(2) +
                                            "MB"}
                                    </td>
                                    <td>{val.fileUploadDate}</td>
                                    {!isStudent ? (
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    deleteFiles(
                                                        className,
                                                        token,
                                                        val.fileName
                                                    ).then((mes) =>
                                                        setMessage({
                                                            text: mes[1] as string,
                                                            status: mes[0] as number,
                                                        })
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    ) : null}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}