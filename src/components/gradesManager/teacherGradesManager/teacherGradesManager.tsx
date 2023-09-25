"use client";
import { useEffect, useState } from "react";
import GradeScores from "./showGradeScores/showGradeScores";
import { Collapse, Button } from "reactstrap";
type testNameID = {
    testName: string;
    test_id: number;
};

const getTestNames = async (className: string, token: string) => {
    return await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/grades/teacher/" + className,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
};

const saveTest = async (className: string, testName: string, token: string) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_HOSTNAME + "/api/grades/teacher/" + className,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ newTestName: testName }),
        }
    );
    return [response.status, await response.text()];
};

export default function TeacherGradesManager({
    className,
    token,
    styles,
}: {
    className: string;
    token: string;
    styles: { readonly [key: string]: string };
}) {
    const [selected, setSelected] = useState<testNameID>();
    const [testOptions, setTestOptions] = useState<testNameID[]>([]);

    const [open, setOpen] = useState(false);
    const [testName, setTestName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [status, setStatus] = useState<number>(0);

    useEffect(() => {
        getTestNames(className, token).then((response): void => {
            if (response.status == 200) {
                response.json().then((data) => {
                    setSelected(data[0]);
                    setTestOptions(data);
                });
            } else response.text().then((text) => setErrorMsg(text));
        });
    }, [message]);

    return (
        <>
            {errorMsg == "" ? (
                testOptions && (
                    <>
                        <div className="btn-group">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="true"
                                aria-expanded="false"
                            >
                                {selected?.testName}
                            </button>
                            <ul className="dropdown-menu">
                                {testOptions.map((val, index) => {
                                    return (
                                        <li key={index}>
                                            <button
                                                onClick={() => setSelected(val)}
                                                className={`dropdown-item ${
                                                    selected?.testName ==
                                                    val.testName
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                {val.testName}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="inline m-3">
                            <button
                                className={`btn ${
                                    open ? "btn-outline-primary" : "btn-primary"
                                }`}
                                onClick={() => setOpen(!open)}
                                aria-controls="Add-test"
                                aria-expanded={open}
                            >
                                Add test
                            </button>

                            <Collapse isOpen={open}>
                                <div id="add-Test" className="m-1">
                                    <div className="flex align-items-center">
                                        <Button
                                            color="primary"
                                            className={`m-2 `}
                                            onClick={() => {
                                                saveTest(
                                                    className,
                                                    testName as string,
                                                    token
                                                ).then((response) => {
                                                    setStatus(
                                                        response[0] as number
                                                    );
                                                    setMessage(
                                                        response[1] as string
                                                    );
                                                });
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            placeholder="Test Name"
                                            value={testName as string}
                                            onChange={(event) => {
                                                setTestName(
                                                    event.target.value as string
                                                );
                                            }}
                                        />
                                    </div>
                                    {message && (
                                        <p
                                            className={`${
                                                status == 201
                                                    ? "text-success"
                                                    : "text-danger"
                                            } block`}
                                        >
                                            {message}
                                        </p>
                                    )}
                                </div>
                            </Collapse>
                        </div>

                        <GradeScores
                            className={className}
                            token={token}
                            testNameID={selected as testNameID}
                            styles={styles}
                        />
                    </>
                )
            ) : (
                <p className="text-danger">{errorMsg}</p>
            )}
        </>
    );
}
