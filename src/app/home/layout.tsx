import SideBar from "@/components/sideBar/sidebar";
import styles from "./styles.module.css";
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.wrapper}>
            <SideBar />
            <div className={styles.content}>
                <div className={`p-2 ${styles.headingContainer}`}>
                    <h1>Welcome to Classtime!</h1>
                </div>
                <div className={styles.contentContainer}>{children}</div>
            </div>
        </div>
    );
}
