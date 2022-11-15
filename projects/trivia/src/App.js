import React, { useState, useEffect } from 'react'
import AppCSS from './App.module.css';
import questionMarkBg from './images/question-mark-bg.png'
import exclamationMarkBg from './images/exclamation-mark-bg.png'
import Question from './Question';

function App() {
  const [questionData, setQuestionData] = useState([])

  function getQuestionData() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(res => res.json())
      .then(data => setQuestionData(data.results))
      .catch(err => console.log(err))
  }

  function generateQuestionArray() {
    return questionData.map(question => 
      <Question 
        key={question.question}
        question={question.question}
        rightAnswer={question.correct_answer}
        wrongAnswers={question.incorrect_answers}
      />
    )               
  }

  return (
    <div className={AppCSS.App}>
      <img src={questionMarkBg} alt='question mark' width='200px' height='200px' id={AppCSS.questionMark}/>
      <img src={exclamationMarkBg} alt='exclamation mark' width='200px' height='200px' id={AppCSS.exclamationMark}/>
      {questionData.length > 0
      ? 
      generateQuestionArray()
      : 
      <div className={AppCSS.intro}>
        <h1>Quizzical</h1>
        <h2>The randomized trivia app</h2>
        <button onClick={getQuestionData}>Start Quiz!</button>
      </div>
      }
      
    </div>
  );
}

export default App;
