import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';

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
  const [progress, setProgress] = useState<number>(0);


  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
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
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      <p>{assesmentDescription()}</p>
      <p>{displayQuestion()}</p>
      <div className="progress">
      <Button className="Progress-Button progress-button decrease-button" onClick={decreaseProgress}>Go Back</Button>
      <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}>{progress}%</div>
      <Button className="Progress-Button progress-button increase-button" onClick={increaseProgress}>Continue</Button>

      </div>
    </div>
  );
}

export default App;
