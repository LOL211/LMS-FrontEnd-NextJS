"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function EditModal({
    selectedStudent,
    testName,
    startScore,
    onSave,
    open,
    setOpen,
}: {
    selectedStudent: string;
    testName: string;
    startScore: number;
    onSave: (newScore: number) => void;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [score, setScore] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
        setScore(startScore);
    }, [startScore]);

    return (
        <>
            <Modal isOpen={open}>
                <ModalHeader>
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Change {selectedStudent} score on {testName}
                    </h1>
                </ModalHeader>
                <ModalBody>
                    {message && <p className="text-danger">{message}</p>}
                    <h2>Set new score</h2>
                    <input
                        type="number"
                        className={`form-control`}
                        placeholder="score"
                        value={score ? score : 0}
                        min={0}
                        max={100}
                        onChange={(event) => {
                            setScore(event.target.value as unknown as number);
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            if (score > 100)
                                setMessage("Score can't be more than 100");
                            else if (score < 0)
                                setMessage("Score can't be less than 0");
                            else {
                                setMessage(null);
                                setOpen(false);
                                onSave(score as number);
                            }
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => {
                            setMessage(null);
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
