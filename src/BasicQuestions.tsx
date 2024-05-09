import './App.css';
import React, { useState } from "react";
//import { render, screen } from "@testing-library/react";
import { Form } from "react-bootstrap";
//import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
//import * as readline from 'readline';
//import * as dotenv from 'dotenv';
/*
const OpenAI = require("openai");
require("dotenv").config();
*/

enum Questions {
    Q1 = "Which best describes your ideal work environment?",
    Q2 = "Which of the following would you least like doing?",
    Q3 = "Now which of the following would you most like doing?",
    Q4 = "Which best describes your personality",
    Q5 = "What is your goal when applying for a job?",
    Q6 = "Once again, which of the following would you least like doing",
    Q7 = "Now which would you most like doing."
}

enum Question1 {
    O1 = "In a cubicle or office in a room with other coworkers.",
    O2 = "A round table where team members each work together to solve problems",
    O3 = "Outside where I can be in natural sunlight",
    O4 = "A secluded area where I can hunker down and get work done"
}

enum Question2 {
    O1 = "Fixing an air conditioning unit in a customers home",
    O2 = "Writing the script for a new movie",
    O3 = "Organizing a database or file system",
    O4 = "Planning an event for a client"
}

enum Question3 {
    O1 = "Fixing an air conditioning unit in a customers home",
    O2 = "Writing the script for a new movie",
    O3 = "Organizing a database or file system",
    O4 = "Planning an event for a client"
}

enum Question4 {
    O1 = "I am an outgoing person who loves taking the lead",
    O2 = "I like to work in groups of people, but I do not usually take charge",
    O3 = "I am introverted, but like to have access to help and coworkers",
    O4 = "I would prefer to have as much privacy as possible"
}

enum Question5 {
    O1 = "To earn as much money as possible",
    O2 = "To make a tangible difference in the world",
    O3 = "To make a stable income to support my lifestyle",
    O4 = "To have fun doing what I love most"
}

enum Question6 {
    O1 = "Caring for a botanical garden",
    O2 = "Assembling circuits in an intricate process",
    O3 = "Planning and constructing new infrastructure for a city",
    O4 = "Help adminster care to the sick"
}

enum Question7 {
    O1 = "Caring for a botanical garden",
    O2 = "Assembling circuits in an intricate process",
    O3 = "Planning and constructing new infrastructure for a city",
    O4 = "Help adminster care to the sick"
}

export function BasicQuestions(): JSX.Element {
    function backButton() {
        setQuestionNum(7);
        setSubmitted(0);
    }
    function subButton1() {
        setQuestionNum(8);
        setSubmitted(1);
    }
    function subButton2() {
        setQuestionNum(8);
        setSubmitted(2);
    }
    const [questionNum, setQuestionNum] = useState<number>(0);
    //const [progress, setProgress] = useState<number>(0);
    const [answer1, setAnswer1] = useState<string>("");
    const [answer2, setAnswer2] = useState<string>("");
    const [answer3, setAnswer3] = useState<string>("");
    const [answer4, setAnswer4] = useState<string>("");
    const [answer5, setAnswer5] = useState<string>("");
    const [answer6, setAnswer6] = useState<string>("");
    const [answer7, setAnswer7] = useState<string>("");
    const [submitted, setSubmitted] = useState<number>(0);
    const [response, setRespones] = useState<string>("");
    //const keys = Object.keys(Question1);
    let GPTrequestBasic = "";
    GPTrequestBasic = `Hello, A client has completed a career quiz and based on the following answers, which job would you think best applies to them:\n 
    Question: ${Questions.Q1}, Options: ${Question1.O1}, ${Question1.O2}, ${Question1.O3},() ${Question1.O4}, Answer Given: ${answer1}.\n
    Question: ${Questions.Q2}: Options: ${Question2.O1}, ${Question2.O2}, ${Question2.O3}, ${Question2.O4}, Answer Given: ${answer2}.\n
    Question: ${Questions.Q3}: Options: ${Question3.O1}, ${Question3.O2}, ${Question3.O3}, ${Question3.O4}, Answer Given: ${answer3}.\n
    Question: ${Questions.Q4}: Options: ${Question4.O1}, ${Question4.O2}, ${Question4.O3}, ${Question4.O4}, Answer Given: ${answer4}.\n
    Question: ${Questions.Q5}: Options: ${Question5.O1}, ${Question5.O2}, ${Question5.O3}, ${Question5.O4}, Answer Given: ${answer5}.\n
    Question: ${Questions.Q6}: Options: ${Question6.O1}, ${Question6.O2}, ${Question6.O3}, ${Question6.O4}, Answer Given: ${answer6}.\n
    Question: ${Questions.Q7}: Options: ${Question7.O1}, ${Question7.O2}, ${Question7.O3}, ${Question7.O4}, Answer Given: ${answer7}.`

    /*
    function chatGPT(GPTrequestBasic): {
        response = await OpenAI.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: message }],
            temperature: 0,
            max_tokens: 1000,
        });
    }
    */
    
    
    return (
        <div style={{backgroundColor: '#282c34',height:'100vh'}}>
            {questionNum <= 7 ? (
                <div>
                    <br></br>
                    <div style={{marginLeft: '20px', marginRight: '20px', marginTop: '10px'}}>
                        <div className="progress_bar_back">
                           <div style={{backgroundColor: 'royalBlue', height: '24px', width: `${questionNum * (100 / 7)}%`, borderRadius: '25px', transition: 'width 1s'}}></div>
                        </div><br></br>
                    </div>
                </div>
            ) : null }
            {questionNum === 0 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <h3>
                        This basic test will present you with 7 different multiple choice questions.<br></br>
                        Please try and answer them as well as you can, do not leave any blank.<br></br>
                    </h3>
                    <button onClick={() => setQuestionNum(questionNum + 1)}>
                        Continue
                    </button>
                    <div className="margin"></div>
                </div>
            ) : questionNum === 1 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
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
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
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
                        checked={answer2 === Question2.O1}
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
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
                        <h3>Question 3: {Questions.Q3}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer3(event.target.value)
                        }
                        id="answer-check-2"
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
            ) : questionNum === 4 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
                        <h3>Question 4: {Questions.Q4}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer4(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question4.O1}
                        value={Question4.O1}
                        checked={answer4 === Question4.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer4(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question4.O2}
                        value={Question4.O2}
                        checked={answer4 === Question4.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer4(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question4.O3}
                        value={Question4.O3}
                        checked={answer4 === Question4.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer4(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question4.O4}
                        value={Question4.O4}
                        checked={answer4 === Question4.O4}
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
            ) : questionNum === 5 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
                        <h3>Question 5: {Questions.Q5}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer5(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question5.O1}
                        value={Question5.O1}
                        checked={answer5 === Question5.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer5(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question5.O2}
                        value={Question5.O2}
                        checked={answer5 === Question5.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer5(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question5.O3}
                        value={Question5.O3}
                        checked={answer5 === Question5.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer5(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question5.O4}
                        value={Question5.O4}
                        checked={answer5 === Question5.O4}
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
            ) : questionNum === 6 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px',marginTop:'auto'}}>
                        <h3>Question 6: {Questions.Q6}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer6(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question6.O1}
                        value={Question6.O1}
                        checked={answer6 === Question6.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer6(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question6.O2}
                        value={Question6.O2}
                        checked={answer6 === Question6.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer6(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question6.O3}
                        value={Question6.O3}
                        checked={answer6 === Question6.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer6(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question6.O4}
                        value={Question6.O4}
                        checked={answer6 === Question6.O4}
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
            ) : questionNum === 7 ? (
                <div className="boxQuestionBack">
                    <div className="margin"></div>
                    <div>
                        <button onClick={() => setQuestionNum(questionNum - 1)}>
                            Back
                        </button>
                    </div>
                    <div style={{textAlign:'left',marginLeft:'100px'}}>
                        <h3>Question 7: {Questions.Q7}</h3>
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer7(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question7.O1}
                        value={Question7.O1}
                        checked={answer7 === Question7.O1}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer7(event.target.value)
                        }
                        id="answer-check-2"
                        label={Question7.O2}
                        value={Question7.O2}
                        checked={answer7 === Question7.O2}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer7(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question7.O3}
                        value={Question7.O3}
                        checked={answer7 === Question7.O3}
                        />
                        <Form.Check
                        type="radio"
                        name="options"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAnswer7(event.target.value)
                        }
                        id="answer-check-1"
                        label={Question7.O4}
                        value={Question7.O4}
                        checked={answer7 === Question7.O4}
                        />
                    </div>
                    <br></br>
                    <div>
                        <button onClick={() => subButton1()}>
                            Submit
                        </button>
                    </div>
                    <div className="margin"></div>
                </div>
            ) : submitted === 1 && questionNum === 8 ? (
                <div>
                    <div style={{height:'100%',width:'100%',backgroundColor:'#282c34'}}>
                            <br></br>
                            <button 
                            onClick={() => backButton()}>
                                Back
                            </button>
                            <br></br>
                            <br></br>
                            <div className="boxQuestionBack">
                                <br></br>
                                <h3>Are you sure you want to submit?</h3>
                                <p>Make sure to review your answers carefully.</p>
                                <br></br>
                            </div>
                            <br></br>
                            <button 
                            onClick={() => subButton2()}>
                                Submit
                            </button>
                            <br></br><br></br>
                        </div>
                </div>
            ) : submitted === 2 && questionNum === 8 ? (
                <div style={{height: '100%', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-around', alignItems: 'baseline'}}>
                    <div>
                        <h1 style={{fontSize: '70px'}}>Here are your answers:</h1>
                        <h4>{Questions.Q1}<br/>- {answer1}</h4>
                        <h4>{Questions.Q2}<br/>- {answer2}</h4>
                        <h4>{Questions.Q3}<br/>- {answer3}</h4>
                        <h4>{Questions.Q4}<br/>- {answer4}</h4>
                        <h4>{Questions.Q5}<br/>- {answer5}</h4>
                        <h4>{Questions.Q6}<br/>- {answer6}</h4>
                        <h4>{Questions.Q7}<br/>- {answer7}</h4>
                    </div>
                    <div>
                        <h2>Please wait while chat GPT prepares your answer below:</h2>
                        <div style={{margin:'auto',borderWidth:'4px',borderStyle: 'solid', borderRadius: '25px', width:'500px',height:'300px'}}></div>
                    </div>
                </div>
            ) : null }
        </div>
    )
}