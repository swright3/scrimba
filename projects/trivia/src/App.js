import React, { useState } from 'react'
import AppCSS from './App.module.css';
import questionMarkBg from './images/question-mark-bg.png'
import exclamationMarkBg from './images/exclamation-mark-bg.png'
import Question from './Question';
import Intro from './Intro'
import {decode} from 'html-entities';

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
  /*formData: An object that stores the state of the form on the intro page. Used by urlConstructor()
  to determine the request sent to the trivia api.*/
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    category: 'any'
  })

  /*Called when the start quiz button is pressed on the title screen. Fetches a new set of questions and
  resets randomizedAnswers, selectedAnswer, and gameOver. When the questions have been fetched, all of the
  text is parsed to decode the html entities.*/
  function startQuiz(event) {
    event.preventDefault()
    if (formData.difficulty === '') {
      alert('Please choose a difficulty')
      return
    }
    const apiUrl = urlConstructor()
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setQuestionData(data.results.map(question => {
          for (let i = 0; i < question.incorrect_answers.length; i++) {
            question.incorrect_answers[i] = decode(question.incorrect_answers[i])
          }
          console.log(question.correct_answer)
          question.correct_answer = decode(question.correct_answer)
          return {
          ...question,
          question: decode(question.question)
        }}))
        setRandomizedAnswers(data.results.map(question => randomizeAnswers(question.correct_answer, question.incorrect_answers)))
        setSelectedAnswer([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
        toggleGameOver()
      })
      .catch(err => console.log(err))
  }

  /*Constructs the url used to fetch the questions from the api. This can change the amount of questions,
  the category, and the difficulty. In future could also change from multiple choice to true/false.*/
  function urlConstructor() {
    const amount = '?amount=10'
    let category = '&category=';
    switch (formData.category) {
      case 'generalKnowledge':
        category += '9'
        break
      case 'scienceAndNature':
        category += '17'
        break
      case 'sports':
        category += '21'
        break
      default:
        category = ''
    }
    let difficulty;
    formData.difficulty === 'mixed' ? difficulty = '' : difficulty= '&difficulty=' + formData.difficulty;
    console.log(`https://opentdb.com/api.php${amount}${category}${difficulty}&type=multiple`)
    return `https://opentdb.com/api.php${amount}${category}${difficulty}&type=multiple`
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

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }))
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
      <Intro handleChange={handleChange} formData={formData} startQuiz={startQuiz}/>
      }
    </div>
  );
}

export default App;
