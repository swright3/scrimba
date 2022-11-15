import React, { useState } from 'react'
import QuestionCSS from './Question.module.css'
import Answer from './Answer'

export default function Question(props) {
    const {questionNumber, question, rightAnswer, wrongAnswers, randomizedAnswers, selectedAnswer, gameOver, handleSelect} = props

    const answerArray = randomizedAnswers.map((randAnswer, index) => 
      <Answer
        key={index}
        questionNumber={questionNumber}
        answerNumber={index+1}
        text={randAnswer}
        selectedAnswer={selectedAnswer}
        rightAnswer={rightAnswer}
        gameOver={gameOver}
        handleSelect={handleSelect}
      />
    )

    return (
        <div className={QuestionCSS.Question}>
            <div className={QuestionCSS.questionUpper}>
                <h2 className={QuestionCSS.questionNumber}>Q{questionNumber}</h2>
                <h3 className={QuestionCSS.description}>{question}</h3>
            </div>
            <div className={QuestionCSS.answers}>
                {answerArray}
            </div>
        </div>
    )
}