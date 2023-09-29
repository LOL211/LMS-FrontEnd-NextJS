"use client";
import { useEffect, useState } from "react";
import EditModal from "./editModal";
import { Button } from "reactstrap";

type TestData = {
    studentName: string;
    score: number;
    studentID: number;
};

const getTestData = async (
    className: string,
    token: string,
    testID: number
) => {
    return await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME +
            "/api/grades/teacher/" +
            className +
            "/" +
            testID,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
};

const sendScore = async (
    score: number,
    className: string,
    testID: number,
    token: string,
    studentID: number
) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME +
            "/api/grades/teacher/" +
            className +
            "/" +
            testID +
            "/" +
            studentID,
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ newScore: score }),
        }
    );
    return [await response.text(), response.status];
};

type testNameID = {
    testName: string;
    test_id: number;
};

export default function GradeScores({
    className,
    token,
    testNameID,
    styles,
}: {
    className: string;
    token: string;
    testNameID: testNameID;
    styles: { readonly [key: string]: string };
}) {
    const [data, setData] = useState<TestData[]>([]);

    const [message, setMessage] = useState<string | undefined>();

    const [open, setOpen] = useState<boolean>(false);

    const update = () => {
        setData([]);
        if (testNameID)
            getTestData(className, token, testNameID.test_id).then(
                (response) => {
                    if (response.status == 200) {
                        response.json().then((dat) => setData(dat));
                    } else {
                        response.text().then((tex) => alert(tex));
                    }
                }
            );
    };

    useEffect(() => {
        update();
        setMessage(undefined);
    }, [testNameID]);

    useEffect(() => {
        update();
    }, [message]);

    const [selectedStudent, setSelectedStudent] = useState<string | undefined>(
        ""
    );
    const [selectedScore, setSelectedScore] = useState<number | undefined>();
    const [selectedStudentID, setSelectedStudentID] = useState<
        number | undefined
    >();
    const [status, setStatus] = useState<number | undefined>();
    const onSave = (newScore: number) => {
        sendScore(
            newScore,
            className,
            testNameID.test_id,
            token,
            selectedStudentID as number
        ).then((response) => {
            setStatus(response[1] as number);
            setMessage(
                message === (response[0] as string)
                    ? message + " "
                    : (response[0] as string)
            );
        });
    };

    return (
        <>
            {message && (
                <h4
                    className={`${
                        status == 200 ? "text-success" : "text-danger"
                    } m-2 p-1`}
                >
                    {message}
                </h4>
            )}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Score</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((val, index) => (
                            <tr key={index}>
                                <td>{val.studentName}</td>
                                <td>
                                    {val.score == -1
                                        ? "Not taken"
                                        : val.score + "%"}
                                </td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            setSelectedScore(
                                                val.score == -1 ? 0 : val.score
                                            );
                                            setSelectedStudent(val.studentName);
                                            setSelectedStudentID(val.studentID);
                                            setOpen(true);
                                        }}
                                    >
                                        Change
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>Loading..</p>
                    )}
                </tbody>
            </table>

            <EditModal
                selectedStudent={selectedStudent as string}
                testName={testNameID ? testNameID.testName : ""}
                onSave={onSave}
                open={open}
                setOpen={setOpen}
                startScore={selectedScore as number}
            />
        </>
    );
}
