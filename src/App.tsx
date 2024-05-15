import React, { useState } from 'react';
import './App.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BasicQuestions } from "./BasicQuestions";
//import { OpenAIApi, Configuration, CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai';
import { text } from 'stream/consumers';

/*
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
*/

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

enum Role {
  User,
  System
  } 
  // default set the role to user, later if prompted allow the user to input admin password
  let role = Role.User;
  //allocate an array for user responses, which will eventually be sent to chatGPT
  let userResponses: string[] = ["answer to question 1","answer to question 2","answer to question 3", "answer to question 4"];
  //array for detailed questions
  let detailedQuestions: string[] = ["Question 1: What does your ideal work day look like?", "Question 2: What type of work are you interested in?", "Question 3: What education do you have, and would you be comfortable going back to school?", "Question 4: What's your ideal work enviroment?"];
  let currentQuestion: number = 0;
  let currentResponse: string = '';

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


function updateProgress(progress: number) {
  const progressBar = document.getElementById("progressBar") as HTMLElement;
  progressBar.style.width = `${progress}%`;
  nextQuestion();
}

function previousQuestion(){
  currentQuestion--;
  userResponses.pop();
  displayQuestion();
}

function App() {
  const [key, setKey] = useState<string>(keyData);
  const [status, setStatus] = useState("home");
  const [progress, setProgress] = useState<number>(0);
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(saveKeyData, event.target.value);
    setKey(event.target.value);
  }


  function increaseProgress() {
    const textareaValue = (document.querySelector('textarea[name="Answer here"]') as HTMLTextAreaElement).value;

    userResponses.push(textareaValue);
    if (progress < 100) {
      setProgress(progress + 25);
    }
    nextQuestion();
  }

  function decreaseProgress() {
    userResponses.pop();
    if (progress > 0) {
      setProgress(progress - 25);
    }
    previousQuestion();
  }



  function ControlledTextarea() {
  
    return (
      <div>
        <textarea
          name="Answer here"
        />
      </div>
    );
  }
  

  return (
    <div className="App">
      <div>
        <header className='navbar'>
          <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>
          <button className="button" onClick={() => setStatus( "home" )}>Home</button>
          <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
        </header>
        {status === "home" ? (
          <div className="homepage">
            <div className="title">
              <h1>Career Quiz</h1>
            </div>
            <div className="desc">
              <p>Feeling lost in the career maze?  
                Unsure if your current path is the right fit? 
                Take our interactive career quiz!  
                With two tracks to choose from, you can get a quick snapshot of your strengths with our basic questions page, or delve deeper with our detailed question set for a more comprehensive analysis.  
                Based on your answers, we'll provide personalized insights to help you identify your ideal career path,  whether you're just starting out or looking for a fulfilling change.  
                Don't wait any longer, take control of your future today!
              </p>
            </div>
            <div className="content">
              <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>
              <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
            </div>
          </div>
        ) : status === "basic" ? (
          <div>
            <BasicQuestions></BasicQuestions>
          </div>
        ) : status === "detailed" ? (
          <div className='anim'>
            <p>{assesmentDescription()}</p>
            <p>{displayQuestion()}</p>
            <p>{ControlledTextarea()}</p>
            <div className="progress"></div>
            <Button className="Progress-Button progress-button decrease-button" onClick={decreaseProgress}>Go Back</Button>
            <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}>{progress}%</div>
            <Button className="Progress-Button progress-button increase-button" onClick={() => { increaseProgress(); }}>Continue</Button>
          </div>
        ) : null }
        <footer className='footer'>
        <div>
            <Form>
            <Form.Label className='API-font'>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
            </Form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
