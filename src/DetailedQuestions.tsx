import './App.css';
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OpenAI from 'openai';

export function DetailedQuestions(): JSX.Element {
    const [progress, setProgress] = useState<number>(0);
    const [currentResponse, setCurrentResponse] = useState<string>('');
    const [gptResponse, setgptResponse] = useState<string | null>("");

    const openai = new OpenAI({
        organization: "org-kNhKymclXJYXGISGMHKqxdfZ",
        project: "proj_yiEE3ziMLecmUsNX3fJBXuWI",
        apiKey: localStorage.getItem("MYKEY")!,
        dangerouslyAllowBrowser: true
      });

    async function gpt(){
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant designed to give career suggestions based on a set of questions and answers and output the results in a JSON format.",
            },
            { role: "user", 
              content: "Based on these questions: " + detailedQuestions + " and these answers: " + userResponses + ", suggest 3 different possible careers and give a description of the career and what the requirements are for that career." },
          ],
          model: "gpt-4-turbo",
          response_format: { type: "json_object" },
        });
        setgptResponse(completion.choices[0].message.content);
      }

    let userResponses: string[] = [""];
    //array for detailed questions
    let detailedQuestions: string[] = ["Question 1: What does your ideal work day look like?", "Question 2: What type of work are you interested in?", "Question 3: What education do you have, and would you be comfortable going back to school?", "Question 4: What's your ideal work enviroment?", "Question 5: What industry or industries excite you right now?", "Question 6: What areas of study interested you most in school?", "Question 7: What are your financial goals?"];
    let currentQuestion: number = 0;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentResponse(event.target.value);
        userResponses.pop();
        userResponses.push(currentResponse);
      };
  
    function nextQuestion(){
      userResponses.push(currentResponse);
      currentQuestion++;
      displayQuestion();
    }
  
    function displayQuestion(){
      return detailedQuestions[currentQuestion];
    }
  
  
  function assesmentDescription(){
    return "If you are looking for a more in depth career quiz, then this is for you. We will ask you some short answer questions, and use your responses to generate some potential career paths for you.";
  }

  function previousQuestion(){
    currentQuestion--;
    userResponses.pop();
    displayQuestion();
  }

  function increaseProgress() {

    if (progress < 100) {
      setProgress(progress + 25);
    }
    nextQuestion();
  }

  function decreaseProgress() {
    if (progress > 0) {
      setProgress(progress - 25);
    }
    previousQuestion();
  }

  function restart(){
    userResponses = [];
    currentQuestion = 0;
    setProgress(0);
    setCurrentResponse("");
    displayQuestion();
    setgptResponse("");
  }

  function submit() {
    userResponses.push(currentResponse);
    currentQuestion++;
    gpt();
  }

  function ControlledTextarea() {
    return (
        <div>
          <textarea
            id="input"
            name="Answer here"
            value={currentResponse}
            onChange={handleChange}
          />
        </div>
      );
}


    return (
        <div>
            {currentQuestion <= 6 ? (
              <div className='anim'>
                <div className='qBox'>
                      <p>{assesmentDescription()}</p>
                      <p>{displayQuestion()}</p>
                      <p>{ControlledTextarea()}</p>
                      <div className="progress"></div>
                      <Button className="Progress-Button progress-button decrease-button" onClick={decreaseProgress}>Back</Button>
                      <Button className="Progress-Button progress-button increase-button" onClick={increaseProgress}>Continue</Button>
                      <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}>{progress}%</div>
                </div>
              </div>
            ) : currentQuestion === 7 ? (
              <div className='anim'>
                <div className='qBox'>
                  <p>{assesmentDescription()}</p>
                  <p>{displayQuestion()}</p>
                  <p>{ControlledTextarea()}</p>
                  <div className="progress"></div>
                  <Button className="Progress-Button progress-button decrease-button" onClick={decreaseProgress}>Back</Button>
                  <Button className="Progress-Button progress-button increase-button" onClick={submit}>Submit</Button>
                  <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}>{progress}%</div>
                </div>
              </div>
            ) : currentQuestion === 8 ? (
              <div style={{height: '100%', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-around', alignItems: 'baseline'}}>
                    <div className="qBoxLarge">
                        <div style={{textAlign:'left',marginLeft:'50px'}}>
                            <h1>Here are your answers:</h1>
                            <h4>{detailedQuestions[0]}<br/>- {userResponses[0]}</h4>
                            <h4>{detailedQuestions[1]}<br/>- {userResponses[1]}</h4>
                            <h4>{detailedQuestions[2]}<br/>- {userResponses[2]}</h4>
                            <h4>{detailedQuestions[3]}<br/>- {userResponses[3]}</h4>
                            <h4>{detailedQuestions[4]}<br/>- {userResponses[4]}</h4>
                            <h4>{detailedQuestions[5]}<br/>- {userResponses[5]}</h4>
                            <h4>{detailedQuestions[6]}<br/>- {userResponses[6]}</h4>
                            <br></br>
                            <button className="button" onClick={() => restart()}>Restart</button>
                        </div>
                    </div>
                    <div className="qBoxLarge">
                        <div style={{textAlign:'left',marginLeft:'50px'}}>
                            <h2>Please wait while chat GPT prepares your results below:</h2>
                            {gptResponse}
                        </div>
                        <div className="loader2"></div>
                    </div>
              </div>
        ) : null }
        </div>
    )
}