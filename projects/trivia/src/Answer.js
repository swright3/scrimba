import React from 'react'
import AnswerCSS from './Answer.module.css'

export default function Answer(props) {
    const {text, questionNumber, answerNumber, selectedAnswer, rightAnswer, gameOver, handleSelect} = props
    
    /*These variables use passed down state to determine if the answer is any combination of 3 things:
    selected: The user has selected this answer.
    right: This is the correct answer for this question.
    wrong: This is one of the incorrect answers for this question.*/
    const selected = selectedAnswer[questionNumber-1] === answerNumber
    const right = text === rightAnswer
    const wrong = text !== rightAnswer

    /*The previously assigned variables are then used to apply styling to the answer.*/
    const classes = `
      ${AnswerCSS.Answer} 
      ${!gameOver && selected && AnswerCSS.selectedAnswer} 
      ${gameOver && right && AnswerCSS.rightAnswer} 
      ${gameOver && selected && wrong && AnswerCSS.wrongAnswer}
    `

    /*When the answer is clicked, the passed down handleSelect function is used to apply this change to
    the selectedAnswer state in the App component.*/
    return (
        <p onClick={() => handleSelect(questionNumber, answerNumber)} className={classes}>
            {text}
        </p>
    )
}