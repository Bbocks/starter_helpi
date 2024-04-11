import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "react-bootstrap";
enum Questions {
    Q1 = "Which best describes your ideal work environment?",
    Q2 = "Which of the following would you least like doing?",
    Q3 = "Now which of the following would you most like doing?",
    Q4 = "Which best describes your personality",
    Q5 = "What is your goal when applying for a job?",
    Q6 = "Which of the following is the least importnat to you",
    Q7 = "Which of the following is the most important to you"
}

enum Question1 {
    O1 = "In a cubicle or office in a room with other coworkers.",
    O2 = "A round table where team members each work together to solve problems",
    O3 = "Outside where I can be in natural sunlight",
    O4 = "A secluded area where I can hunker down and get work done"
}

enum Question2 {
    O1 = "Option1",
    O2 = "Option2",
    O3 = "Option3",
    O4 = "Option4"
}

enum Question3 {
    O1 = "Option1",
    O2 = "Option2",
    O3 = "Option3",
    O4 = "Option4"
}

export function BasicQuestions(): JSX.Element {
    const [questionNum, setQuestionNum] = useState<number>(0);
    //const [progress, setProgress] = useState<number>(0);
    const [answer1, setAnswer1] = useState<string>("");
    const [answer2, setAnswer2] = useState<string>("");
    const [answer3, setAnswer3] = useState<string>("");
    const [answer4, setAnswer4] = useState<string>("");
    const [answer5, setAnswer5] = useState<string>("");
    const [answer6, setAnswer6] = useState<string>("");

    return (
        <div>
            {questionNum === 0 ? (
                <div className="center">
                    <div className="margin"></div>
                    <p>
                        This basic test will present you with 7 different multiple choice questions.<br></br>
                        Please try and answer them as well as you can, do not leave any blank.<br></br>
                    </p>
                    <button onClick={() => setQuestionNum(questionNum + 1)}>
                        Continue
                    </button>
                    <div className="margin"></div>
                </div>
            ) : questionNum === 1 ? (
                <div>
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div className="left">
                        <h3>Question 1: {Questions.Q1}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer1(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question1.O1}
                        value={Question1.O1}
                        checked={answer1 === Question1.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer1(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question1.O2}
                        value={Question1.O2}
                        checked={answer1 === Question1.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer1(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question1.O3}
                        value={Question1.O3}
                        checked={answer1 === Question1.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer1(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question1.O4}
                        value={Question1.O4}
                        checked={answer1 === Question1.O4}
                        />
                    </div>
                    <br></br>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum + 1)}>
                            Next
                        </button>
                    </div>
                    <div className="margin"></div>
                </div>
            ) : questionNum === 2 ? (
                <div>
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div className="center">
                        <h3>Question 2: {Questions.Q2}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer2(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question2.O1}
                        value={Question2.O1}
                        checked={answer2 === Question1.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer2(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question2.O2}
                        value={Question2.O2}
                        checked={answer2 === Question2.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer2(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question2.O3}
                        value={Question2.O3}
                        checked={answer2 === Question2.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer2(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question2.O4}
                        value={Question2.O4}
                        checked={answer2 === Question2.O4}
                        />
                    </div>
                    <br></br>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum + 1)}>
                            Next
                        </button>
                    </div>
                    <div className="margin"></div>
                </div>
            ) : questionNum === 3 ? (
                <div>
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div className="center">
                        <h3>Question 3: {Questions.Q3}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer3(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question3.O1}
                        value={Question3.O1}
                        checked={answer3 === Question3.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer3(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question3.O2}
                        value={Question3.O2}
                        checked={answer3 === Question3.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer3(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question3.O3}
                        value={Question3.O3}
                        checked={answer3 === Question3.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer3(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question3.O4}
                        value={Question3.O4}
                        checked={answer3 === Question3.O4}
                        />
                    </div>
                    <br></br>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum + 1)}>
                            Next
                        </button>
                    </div>
                    <div className="margin"></div>
                </div>
            ) : null}
        </div>
    )
}