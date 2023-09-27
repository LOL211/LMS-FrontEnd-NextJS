import { useEffect, useState } from "react";

type studentTest = {
    testName: string;
    score: number;
};

const getStudentData = async (className: string, token: string) => {
    return await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/grades/student/" + className,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
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
    const [testScores, setTestScores] = useState<studentTest[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>("");

    let averageScore = 0;
    useEffect(() => {
        getStudentData(className, token).then((response) => {
            if (response.status == 200)
                response.json().then((data) => setTestScores(data));
            else response.text().then((text) => setErrorMsg(text));
        });
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
            {errorMsg == "" ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testScores.length > 0 ? (
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
                        ) : (
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p className="text-danger">{errorMsg}</p>
            )}
        </>
    );
}
