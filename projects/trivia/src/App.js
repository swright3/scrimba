import React, { useState, useEffect } from 'react'
import AppCSS from './App.module.css';
import questionMarkBg from './images/question-mark-bg.png'
import exclamationMarkBg from './images/exclamation-mark-bg.png'
import Question from './Question';

function App() {
  const [questionData, setQuestionData] = useState([])
  const [randomizedAnswers, setRandomizedAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
  const [gameOver, setGameOver] = useState(false)

  function startQuiz() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuestionData(data.results)
        setRandomizedAnswers(data.results.map(question => randomizeAnswers(question.correct_answer, question.incorrect_answers)))
        setRandomizedAnswers([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
        toggleGameOver()
      })
      .catch(err => console.log(err))
    console.log(randomizedAnswers)
  }

  function generateQuestionArray() {
    return questionData.map((question, index) => 
      <Question 
        key={index}
        questionNumber={index+1}
        question={question.question}
        rightAnswer={question.correct_answer}
        wrongAnswers={question.incorrect_answers}
        randomizedAnswers={randomizedAnswers[index]}
        selectedAnswer={selectedAnswer}
        gameOver={gameOver}
        handleSelect={handleSelect}
      />
    )               
  }

  function randomizeAnswers(rightAnswer, wrongAnswers) {
    let answerArray = [rightAnswer, ...wrongAnswers]
    let newArray = []
    let randomNo, removed
    while (answerArray.length > 0) {
        randomNo = Math.floor(Math.random()*answerArray.length)
        removed = answerArray.splice(randomNo,1)[0]
        newArray.push(removed)
    }
    return newArray
  }

  function handleSelect(questionNumber, answerNumber) {
    !gameOver && 
    setSelectedAnswer(prevState => {
      let newArray = [...prevState]
      newArray[questionNumber-1] = answerNumber
      return newArray
    })
  }

  function handleSubmit() {
    selectedAnswer.includes(-1)
    ? alert('Try and answer all the questions :)')
    : toggleGameOver()
  }

  function toggleGameOver() {
    setGameOver(prevState => !prevState)
  }

  function resetQuiz() {
    setQuestionData([])
  }

  return (
    <div className={AppCSS.App}>
      <img src={questionMarkBg} alt='question mark' width='200px' height='200px' id={AppCSS.questionMark}/>
      <img src={exclamationMarkBg} alt='exclamation mark' width='200px' height='200px' id={AppCSS.exclamationMark}/>
      {questionData.length > 0
      ? 
      <main>
        {generateQuestionArray()}
        {!gameOver
        ? <button id={AppCSS.submit} onClick={handleSubmit}>Check Answers</button>
        : <button id={AppCSS.reset} onClick={resetQuiz}>Reset</button>
        }
        
      </main>
      : 
      <div className={AppCSS.intro}>
        <h1>Quizzical</h1>
        <h2>The randomized trivia app</h2>
        <button onClick={startQuiz}>Start Quiz!</button>
      </div>
      }
    </div>
  );
}

export default App;
