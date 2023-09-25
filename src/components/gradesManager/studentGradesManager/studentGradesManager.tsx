import { useEffect, useState } from "react";

type studentTest = {
    testName: string;
    score: number;
};

const getStudentData = async (className: string, token: string) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/grades/student/" + className,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
    return await response.json();
};

export default function StudentGradesManager({
    token,
    className,
    styles,
}: {
    token: string;
    className: string;
    styles: { readonly [key: string]: string };
}) {
    const [testScores, setTestScores] = useState<studentTest[] | undefined>();
    let averageScore = 0;
    useEffect(() => {
        getStudentData(className, token).then((data) => setTestScores(data));
    }, []);

    if (testScores) {
        const totalScore = testScores.reduce(
            (total, val) => total + val.score,
            0
        );
        averageScore = totalScore / testScores.length;
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {testScores && (
                        <>
                            {testScores.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.testName}</td>
                                    <td>{val.score}%</td>
                                </tr>
                            ))}
                            <tr>
                                <td>Average</td>
                                <td>{averageScore.toFixed(2)}%</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </>
    );
}
