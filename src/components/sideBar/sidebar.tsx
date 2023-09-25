"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

type Data = {
    name: string;
    classes: string[];
};

async function getData(token: string | undefined): Promise<Data> {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/home",
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    const data = await response.json();
    const name: string = data.name;
    const classes: string[] = data.classes;
    Cookie.set("role", data.role);
    return { name, classes };
}

export default function SideBar({ content }: { content: React.ReactNode }) {
    const [name, setName] = useState<string>("");
    const [classes, setClasses] = useState<string[]>([]);
    const router = useRouter();
    const token: string | undefined = Cookie.get("token");

    useEffect(() => {
        if (token == undefined) {
            router.push("/");
        }
        getData(token).then((data) => {
            setName(data.name);
            setClasses(data.classes);
        });
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <nav className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h1 className={`p-4 text-center ${styles.heading}`}>
                            {name ? `Hi ${name}` : "Hi.. loading"}
                        </h1>
                    </div>
                    <hr className={styles.line}></hr>
                    {classes ? (
                        classes.map((val, index) => (
                            <Link
                                className={styles.link}
                                href={"/home/" + val}
                                key={index}
                            >
                                {val}
                            </Link>
                        ))
                    ) : (
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </nav>

                <div className={styles.content}>
                    <div className={`p-2 ${styles.headingContainer}`}>
                        <h1>Welcome to Classtime!</h1>
                    </div>
                    <div className={styles.contentContainer}>{content}</div>
                </div>
            </div>
        </>
    );
}
