import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { BasicQuestions } from "./BasicQuestions";
import git from "./GitHub.png";
import { DetailedQuestions } from './DetailedQuestions';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



/*function updateProgress(progress: number) {
  const progressBar = document.getElementById("progressBar") as HTMLElement;
  progressBar.style.width = `${progress}%`;
  nextQuestion();
}*/


function App() {
  const [key, setKey] = useState<string>(keyData);
  const [status, setStatus] = useState("home");
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(saveKeyData, event.target.value);
    setKey(event.target.value);
  }
  

  return (
    <div className="App">
      <div>
        <header className='navbar'>
          <button disabled={localStorage.getItem("MYKEY") === null} className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>
          <button className="button" onClick={() => setStatus( "home" )}>Home</button>
          <button disabled={localStorage.getItem("MYKEY") === null} className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
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
              <button disabled={localStorage.getItem("MYKEY") === null} className="button" onClick={() => setStatus(  "basic" )}>Basic Assessment</button>
              <button disabled={localStorage.getItem("MYKEY") === null} className="button" onClick={() => setStatus( "detailed" )}>Detailed Assessment</button>
            </div>
            <h1 style={{color: 'white'}}>Please make sure to input API key before beginning the basic or detailed career Quizzes</h1>
          </div>
        ) : status === "basic" ? (
          <div>
            <BasicQuestions></BasicQuestions>
          </div>
        ) : status === "detailed" ? (
            <DetailedQuestions></DetailedQuestions>
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
