"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Button, Spinner } from "reactstrap";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status != 200) {
                setErrorMessage(
                    "Invalid credentials, please check email and password"
                );
            } else {
                const data = await response.json();
                setErrorMessage("");
                Cookie.set("token", data.token, { expires: 1 });

                router.push("/home");
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <main>
            <div
                className={`${styles.container} flex items-center justify-center h-screen`}
            >
                <div className={styles.card}>
                    <div className={styles.cardContainer}>
                        <p className="p-8 text-center block font-bold text-xl mb-2">
                            Classtime!
                        </p>
                        <p className="text-danger">{errorMessage}</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className={`form-control ${styles.inputStyle}`}
                                id="login_email"
                                aria-describedby="emailHelp"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />

                            <input
                                type="password"
                                className={`form-control ${styles.inputStyle}`}
                                id="login_password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />

                            <div className={styles.submitBtnHolder}>
                                {loading ? (
                                    <Spinner></Spinner>
                                ) : (
                                    <Button
                                        color="primary"
                                        type="submit"
                                        className={styles.btnStyle}
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
