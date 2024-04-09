import React, { useState } from "react";
//import { Form } from "react-bootsrap";

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
    O1 = "Option1",
    O2 = "Option2",
    O3 = "Option3",
    O4 = "Option4"
}

export function BasicQuestions(): JSX.Element {
    const [questionNum, setQuestionNum] = useState<number>(0);
    //const [progress, setProgress] = useState<number>(0);
    return (
        <div>
            {questionNum === 0 ? (
                <div className="center">
                    <p>description</p>
                    <button onClick={() => setQuestionNum(questionNum + 1)}>
                        Continue
                    </button>
                </div>
            ) : questionNum === 1 ? (
                <div className="center">
                    <h3>Question 1: {Questions.Q1}</h3>
                    <p>
                        {Question1.O1}<br></br>
                        {Question1.O2}<br></br>
                        {Question1.O3}<br></br>
                        {Question1.O4}<br></br>
                    </p>
                </div>
            ) : null}
        </div>
    )
}