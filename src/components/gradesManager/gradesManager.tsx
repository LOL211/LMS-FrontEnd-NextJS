import styles from "./styles.module.css";
import StudentGradesManager from "./studentGradesManager/studentGradesManager";
import TeacherGradesManager from "./teacherGradesManager/teacherGradesManager";
import { useRouter } from "next/navigation";

export default function GradesManager({
    isStudent,
    token,
    className,
}: {
    isStudent: boolean;
    token: string;
    className: string;
}) {
    const router = useRouter();
    if (token == undefined) {
        router.push("/");
    }

    if (isStudent) {
        return (
            <StudentGradesManager
                token={token}
                className={className}
                styles={styles}
            />
        );
    } else {
        return (
            <TeacherGradesManager
                className={className}
                token={token}
                styles={styles}
            />
        );
    }
}
