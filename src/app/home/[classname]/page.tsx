"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import GradesManager from "@/components/gradesManager/gradesManager";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import FileManager from "@/components/fileManager/fileManager";
export default function homePage({
    params,
}: {
    params: { classname: string };
}) {
    const className = params.classname;
    const token: string = Cookie.get("token") as string;
    const isStudent: boolean = Cookie.get("role") == "STUDENT" ? true : false;
    const [selected, setSelected] = useState("Grades");
    const router = useRouter();

    useEffect(() => {
        if (token == undefined) {
            router.push("/");
        }
    }, []);

    return (
        <div className={`h-full w-full ${styles.container}`}>
            <div className={styles.content}>
                <h1 className={styles.heading}>{className}</h1>
                <div className="p-2">
                    <div className="btn-group">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="true"
                            aria-expanded="false"
                        >
                            {selected}
                        </button>
                        <ul className="dropdown-menu">
                            <li key="grades">
                                <button
                                    onClick={() => setSelected("Grades")}
                                    className={`dropdown-item ${
                                        selected == "Grades" ? "active" : ""
                                    }`}
                                >
                                    Grades
                                </button>
                            </li>
                            <li key="files">
                                <button
                                    className={`dropdown-item ${
                                        selected == "Files" ? "active" : ""
                                    }`}
                                    aria-current="true"
                                    onClick={() => setSelected("Files")}
                                >
                                    Files
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-2">
                    {selected == "Grades" ? (
                        <GradesManager
                            isStudent={isStudent}
                            token={token}
                            className={className}
                        />
                    ) : (
                        <FileManager
                            isStudent={isStudent}
                            token={token}
                            className={className}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
