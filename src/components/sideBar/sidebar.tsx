"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "reactstrap";

async function getData(token: string): Promise<any> {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/home",
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
    if (response.status == 200) {
        const data = await response.json();
        const name: string = data.name;
        const classes: string[] = data.classes;
        Cookie.set("role", data.role);
        return { name, classes };
    } else {
        return Promise<undefined>;
    }
}

export default function SideBar() {
    const [name, setName] = useState<string>("");
    const [classes, setClasses] = useState<string[]>([]);
    const router = useRouter();
    const token: string = Cookie.get("token") as string;

    useEffect(() => {
        if (token == undefined) {
            router.push("/");
        }

        getData(token).then((data) => {
            if (data) {
                setName(data.name);
                setClasses(data.classes);
            } else router.push("/");
        });
    }, []);

    return (
        <>
            <nav className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={`p-4 text-center ${styles.heading}`}>
                        {name ? `Hi ${name}` : "Hi.. loading"}
                    </h1>
                </div>
                <hr className={styles.line}></hr>
                {classes.length > 0 ? (
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
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </nav>
            <div
                className={`flex justify-evenly content-center ${styles.footer}`}
            >
                <Button
                    color="primary"
                    onClick={() => {
                        Cookie.remove("token");
                        Cookie.remove("role");
                        router.push("/");
                    }}
                >
                    Logout
                </Button>
            </div>
        </>
    );
}
