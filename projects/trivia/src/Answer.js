import React from 'react'
import AnswerCSS from './Answer.module.css'

export default function Answer(props) {
    const {text, questionNumber, answerNumber, selectedAnswer, rightAnswer, gameOver, handleSelect} = props
    
    const selected = selectedAnswer[questionNumber-1] === answerNumber
    const right = text === rightAnswer
    const wrong = text !== rightAnswer

    const classes = `
      ${AnswerCSS.Answer} 
      ${!gameOver && selected && AnswerCSS.selectedAnswer} 
      ${gameOver && right && AnswerCSS.rightAnswer} 
      ${gameOver && selected && wrong && AnswerCSS.wrongAnswer}
    `
    //console.log(selected, selectedAnswer, answerNumber)

    return (
        <p onClick={() => handleSelect(questionNumber, answerNumber)} className={classes}>
            {text}
        </p>
    )
}