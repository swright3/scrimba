import React, { useState, useEffect } from 'react'
import AppCSS from './App.module.css';
import questionMarkBg from './images/question-mark-bg.png'
import exclamationMarkBg from './images/exclamation-mark-bg.png'

function App() {
  const [questions, setQuestions] = useState([])

  return (
    <div className={AppCSS.App}>
      <img src={questionMarkBg} alt='question mark' width='200px' height='200px' id={AppCSS.questionMark}/>
      <img src={exclamationMarkBg} alt='exclamation mark' width='200px' height='200px' id={AppCSS.exclamationMark}/>
      {questions.length > 0
      ? 
      <div>Hello</div>
      : 
      <div className={AppCSS.intro}>
        <h1>Quizzical</h1>
        <h2>The randomized trivia app</h2>
        <button>Start Quiz!</button>
      </div>
      }
      
    </div>
  );
}

export default App;
