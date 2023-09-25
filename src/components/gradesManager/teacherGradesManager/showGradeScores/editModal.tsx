"use client";
import { useEffect, useState } from "react";

export default function EditModal({
    selectedStudent,
    testName,
    startScore,
    onSave,
}: {
    selectedStudent: string;
    testName: string;
    startScore: number;
    onSave: (newScore: number) => void;
}) {
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        setScore(startScore);
    }, [startScore]);

    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                        >
                            Change {selectedStudent}'s score on {testName}
                        </h1>
                    </div>
                    <div className="modal-body">
                        <h2>Set new score</h2>
                        <input
                            type="number"
                            className={`form-control`}
                            placeholder="score"
                            value={score ? score : 0}
                            min={0}
                            max={100}
                            onChange={(event) => {
                                setScore(
                                    event.target.value as unknown as number
                                );
                            }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            aria-label="Save"
                            onClick={() => onSave(score as number)}
                        >
                            Save
                        </button>
                        <button
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="button"
                            className="btn btn-danger"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
