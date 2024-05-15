import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { BasicQuestions } from "./BasicQuestions";
//import { text } from 'stream/consumers';
import git from "./GitHub.png";
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

//enum Role {
//  User,
//  System
//  } 
  // default set the role to user, later if prompted allow the user to input admin password
  //let role = Role.User;
  //allocate an array for user responses, which will eventually be sent to chatGPT
  let userResponses: string[] = ["answer to question 1","answer to question 2","answer to question 3", "answer to question 4"];
  //array for detailed questions
  let detailedQuestions: string[] = ["Question 1: What does your ideal work day look like?", "Question 2: What type of work are you interested in?", "Question 3: What education do you have, and would you be comfortable going back to school?", "Question 4: What's your ideal work enviroment?", "Question 5: What industry or industries excite you right now?", "Question 6: What areas of study interested you most in school?", "Question 7: What are your financial goals?"];
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


/*function updateProgress(progress: number) {
  const progressBar = document.getElementById("progressBar") as HTMLElement;
  progressBar.style.width = `${progress}%`;
  nextQuestion();
}*/

function previousQuestion(){
  currentQuestion--;
  userResponses.pop();
  displayQuestion();
}

function App() {
  const [key, setKey] = useState<string>(keyData);
  const [status, setStatus] = useState("home");
  const [progress, setProgress] = useState<number>(0);
  const [currentResponse, setCurrentResponse] = useState<string>('');
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(saveKeyData, event.target.value);
    setKey(event.target.value);
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



  function ControlledTextarea() {
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentResponse(event.target.value);
      userResponses.pop();
      userResponses.push(currentResponse);
    };
  
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
            <Button className="Progress-Button progress-button increase-button" onClick={increaseProgress}>Continue</Button>
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
          <div className='names'>
            <p className='name'><a href='https://github.com/Bbocks'>Brett Bockstein</a></p> 
            <img
              src={git}
              alt='Git Logo'
              className='git-img'
            />
            <p className='name'><a href='https://github.com/bbatts24'>Phillip Colburn</a></p>
            <img
              src={git}
              alt='Git Logo'
              className='git-img'
            />
            <p className='name'><a href='https://github.com/mdgaydos'>Miles Gaydos</a></p>
            <img
              src={git}
              alt='Git Logo'
              className='git-img'
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
