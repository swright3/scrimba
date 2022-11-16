import React, { useState, useEffect } from 'react'
import AppCSS from './App.module.css';
import questionMarkBg from './images/question-mark-bg.png'
import exclamationMarkBg from './images/exclamation-mark-bg.png'
import Question from './Question';
import Intro from './Intro'

function App() {
  /*questionData: An array of question objects fetched from the OTDB API.*/
  const [questionData, setQuestionData] = useState([])
  /*randomizedAnswers: A 2d array of sets of 4 answers. The question objects contain correct_answer and
  incorrect_answers, these are then put in a new array and their positions randomized, like a normal quiz.*/
  const [randomizedAnswers, setRandomizedAnswers] = useState([])
  /*selectedAnswer: An array of integers. Each index represents which answer the user has selected for each
  question. The integer corresponds with the answer's index in the question's array stored in randomizedAnswers.*/
  const [selectedAnswer, setSelectedAnswer] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
  /*gameOver: A boolean. On the title screen and when results are shown it is true. When the quiz is being
  played it is true. Used to render the score and reset button, and by the Answer component to determine styling.*/
  const [gameOver, setGameOver] = useState(true)


  /*Called when the start quiz button is pressed on the title screen. Fetches a new set of questions and
  resets randomizedAnswers, selectedAnswer, and gameOver.*/
  function startQuiz() {
    console.log('hi')
    fetch('https://opentdb.com/api.php?amount=10&category=9')
      .then(res => res.json())
      .then(data => {
        setQuestionData(data.results)
        setRandomizedAnswers(data.results.map(question => randomizeAnswers(question.correct_answer, question.incorrect_answers)))
        setSelectedAnswer([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
        toggleGameOver()
      })
      .catch(err => console.log(err))
  }

  /*Maps over the questions in questionData and returns an array of <Question /> components.*/
  function generateQuestionArray() {
    return questionData.map((question, index) => 
      <Question 
        key={index}
        questionNumber={index+1}
        question={question.question}
        rightAnswer={question.correct_answer}
        randomizedAnswers={randomizedAnswers[index]}
        selectedAnswer={selectedAnswer}
        gameOver={gameOver}
        handleSelect={handleSelect}
      />
    )               
  }

  /*Takes a correct answer and an array of incorrect answers. Randomly places these in a new array.
  Used when the questions are initially fetched so that the right answer for each question is in a 
  different random position like a quiz.*/
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

  /*Only active during the quiz phase (gameOver===false). When the user clicks on an answer, this saves
  which answer has been selected. Functions by changing the anwer number in selectedAnswer for the
  corresponding question.*/
  function handleSelect(questionNumber, answerNumber) {
    !gameOver && 
    setSelectedAnswer(prevState => {
      let newArray = [...prevState]
      newArray[questionNumber-1] = answerNumber
      return newArray
    })
  }

  /*When the user clicks to submit ansers, this function checks whether all questions have been answered.
  If not, an alert is sent to the window. If so, gameOver is set to true so the answers and score can be revealed.*/
  function handleSubmit() {
    selectedAnswer.includes(-1)
    ? alert('Try and answer all the questions :)')
    : toggleGameOver()
  }

  /*Toggles the gameOver state variable between true and false.*/
  function toggleGameOver() {
    setGameOver(prevState => !prevState)
  }

  /*Wipes the stored question data. Conditional rendering relies on this to display the title page.*/
  function resetQuiz() {
    setQuestionData([])
  }

  /*Compares the correct_answer for each question with the selected answer and tallies a score.
  randomizedAnswers[index]: The randomized array of answers for the current question.
  selectedAnswer[index]-1: The user's chosen answer in the form of an index.
  randomizedAnswers[index][selectedAnswer[index]-1]: The actual text of the answer the user chose.*/
  function calculateScore() {
    return questionData.reduce((score, question, index) => question.correct_answer === randomizedAnswers[index][selectedAnswer[index]-1]
    ? score+1 : score,0)
  }

  /*When there are no questions, the title screen is rendered. Otherwise the questions are rendered.*/
  return (
    <div className={AppCSS.App}>
      <img src={questionMarkBg} alt='question mark' width='200px' height='200px' id={AppCSS.questionMark}/>
      <img src={exclamationMarkBg} alt='exclamation mark' width='200px' height='200px' id={AppCSS.exclamationMark}/>
      {questionData.length > 0
      ? 
      <main>
        {generateQuestionArray()}
        {gameOver && <h2 id={AppCSS.score}>You scored {calculateScore()}/10 correct answers</h2>}
        {!gameOver
        ? <button id={AppCSS.submit} onClick={handleSubmit}>Check Answers</button>
        : <button id={AppCSS.reset} onClick={resetQuiz}>Reset</button>
        }
      </main>
      : 
      <Intro startQuiz={startQuiz}/>
      }
    </div>
  );
}

export default App;
