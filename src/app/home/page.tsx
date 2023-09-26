import styles from "./styles.module.css";
export default function Home() {
    return (
        <>
            <div
                className={`w-full flex items-center justify-center ${styles.home}`}
            >
                <p>Open a class..</p>
            </div>
        </>
    );
}
