import styles from "./styles.module.css";
import StudentGradesManager from "./studentGradesManager/studentGradesManager";
import TeacherGradesManager from "./teacherGradesManager/teacherGradesManager";

export default function GradesManager({
    isStudent,
    token,
    className,
}: {
    isStudent: boolean;
    token: string;
    className: string;
}) {
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
