import React from 'react'
import QuestionCSS from './Question.module.css'

export default function Question(props) {
    const {question, rightAnswer, wrongAnswers} = props
    console.log(question)
    return (
        <div className={QuestionCSS.Question}>
            <h2>{question}</h2>
            <p>{rightAnswer}</p>
            <p>{wrongAnswers}</p>
        </div>
    )
}