import './App.css';
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OpenAI from 'openai';

export function DetailedQuestions(): JSX.Element {
    const [progress, setProgress] = useState<number>(0);
    const [currentResponse, setCurrentResponse] = useState<string>('');
    const [gptResponse, setGptResponse] = useState<string | null>("");
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [userResponses, setUserResponses] = useState<string[]>([""]);

    const openai = new OpenAI({
        organization: "org-kNhKymclXJYXGISGMHKqxdfZ",
        project: "proj_yiEE3ziMLecmUsNX3fJBXuWI",
        apiKey: localStorage.getItem("MYKEY")!,
        dangerouslyAllowBrowser: true
    });

    async function gpt() {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to give career suggestions based on a set of questions and answers and output the results in a JSON format.",
                },
                {
                    role: "user",
                    content: "Based on these questions: " + detailedQuestions + " and these answers: " + userResponses + ", suggest 3 different possible careers and give a description of the career and what the requirements are for that career."
                },
            ],
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
        });
        setGptResponse(completion.choices[0].message.content);
    }

    const detailedQuestions: string[] = [
        "Question 1: What does your ideal work day look like?",
        "Question 2: What type of work are you interested in?",
        "Question 3: What education do you have, and would you be comfortable going back to school?",
        "Question 4: What's your ideal work environment?",
        "Question 5: What industry or industries excite you right now?",
        "Question 6: What areas of study interested you most in school?",
        "Question 7: What are your financial goals?"
    ];

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentResponse(event.target.value);
    };

    const nextQuestion = () => {
        const updatedResponses = [...userResponses];
        updatedResponses[currentQuestion] = currentResponse;
        setUserResponses(updatedResponses);
        setCurrentResponse("");
        setCurrentQuestion(currentQuestion + 1);
        setProgress((currentQuestion + 1) / detailedQuestions.length * 100);
    };

    const previousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
        setCurrentResponse(userResponses[currentQuestion - 1]);
        setProgress((currentQuestion - 1) / detailedQuestions.length * 100);
    };

    const restart = () => {
        setUserResponses([]);
        setCurrentQuestion(0);
        setProgress(0);
        setCurrentResponse("");
        setGptResponse("");
    };

    const submit = () => {
        const updatedResponses = [...userResponses];
        updatedResponses[currentQuestion] = currentResponse;
        setUserResponses(updatedResponses);
        setCurrentQuestion(currentQuestion + 1);
        gpt();
    };

    const ControlledTextarea = () => (
        <div>
            <textarea
                id="input"
                name="Answer here"
                value={currentResponse}
                onChange={handleChange}
            />
        </div>
    );

    const assesmentDescription = () => (
        "If you are looking for a more in-depth career quiz, then this is for you. We will ask you some short answer questions, and use your responses to generate some potential career paths for you."
    );

    return (
        <div>
            {currentQuestion < detailedQuestions.length ? (
                <div className='anim'>
                    <p>{assesmentDescription()}</p>
                    <p>{detailedQuestions[currentQuestion]}</p>
                    <p><ControlledTextarea /></p>
                    <Button className="Progress-Button progress-button decrease-button" onClick={previousQuestion} disabled={currentQuestion === 0}>Back</Button>
                    <Button className="Progress-Button progress-button increase-button" onClick={nextQuestion}>Continue</Button>
                    <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}></div>
                </div>
            ) : currentQuestion === detailedQuestions.length ? (
                <div className='anim'>
                    <p>{assesmentDescription()}</p>
                    <p>{detailedQuestions[currentQuestion - 1]}</p>
                    <p><ControlledTextarea /></p>
                    <Button className="Progress-Button progress-button decrease-button" onClick={previousQuestion}>Back</Button>
                    <Button className="Progress-Button progress-button increase-button" onClick={submit}>Submit</Button>
                    <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}></div>
                </div>
            ) : (
                <div style={{ height: '100%', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-around', alignItems: 'baseline' }}>
                    <div className="qBoxLarge">
                        <div style={{ textAlign: 'left', marginLeft: '50px' }}>
                            <h1>Here are your answers:</h1>
                            {detailedQuestions.map((question, index) => (
                                <h4 key={index}>{question}<br />- {userResponses[index]}</h4>
                            ))}
                            <br></br>
                            <button className="button" onClick={restart}>Restart</button>
                        </div>
                    </div>
                    <div className="qBoxLarge">
                        <div style={{ textAlign: 'left', marginLeft: '50px' }}>
                            <h2>Please wait while chat GPT prepares your results below:</h2>
                            {gptResponse}
                        </div>
                        <div className="loader2"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
