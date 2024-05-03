import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { BasicQuestions } from "./BasicQuestions";
//import { OpenAIApi, Configuration, CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai';
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
  let userResponses: string[] = [];
  //array for detailed questions
  let detailedQuestions: string[] = ["Question 1:", "Question 2:", "Question 3:"];
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
  return "This is where the assessment description will be printed";
}


function updateProgress(progress: number) {
  const progressBar = document.getElementById("progressBar") as HTMLElement;
  progressBar.style.width = `${progress}%`;
  nextQuestion();
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
  }


  function increaseProgress() {
    if (progress < 100) {
      setProgress(progress + 1);
    }
  }

  function decreaseProgress() {
    if (progress > 0) {
      setProgress(progress - 1);
    }
  }

  return (
    <div className="App">
      <div>
        {status === "home" ? (
          <div className="homepage">
            <header className='navbar'>
              <div className='navgroup'>
                <button className="button" onClick={() => setStatus( "home" )}>Home</button>
                <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>  
                <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
              </div>
              <div className='navlog'>
                <button className="button" onClick={() => setStatus( "login" )}>Login</button>
              </div>
            </header>
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
            <header className='navbar'>
              <div className='navgroup'>
                <button className="button" onClick={() => setStatus( "home" )}>Home</button>
                <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>  
                <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
              </div>
              <button className="button" onClick={() => setStatus( "login" )}>Login</button>
            </header>
            <br></br>
            <BasicQuestions></BasicQuestions>
          </div>
        ) : status === "detailed" ? (
          <div>
            <header className='navbar'>
              <div className='navg'>
                <button className="button" onClick={() => setStatus( "home" )}>Home</button>
                <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>  
                <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
              </div>
              <button className="button" onClick={() => setStatus( "login" )}>Login</button>
            </header>
            <p>{assesmentDescription()}</p>
            <p>{displayQuestion()}</p>
            <div className="progress"></div>
            <Button className="Progress-Button progress-button decrease-button" onClick={decreaseProgress}>Go Back</Button>
            <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}>{progress}%</div>
            <Button className="Progress-Button progress-button increase-button" onClick={increaseProgress}>Continue</Button>
          </div>
        ) : status === "login" ? (
          <div>
            <header className='navbar'>
              <div className='navg'>
                <button className="button" onClick={() => setStatus( "home" )}>Home</button>
                <button className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>  
                <button className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
              </div>
              <button className="button" onClick={() => setStatus( "login" )}>Login</button>
            </header>
            <div className='api'>
              <Form>
              <Form.Label>API Key:</Form.Label>
              <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
              <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
