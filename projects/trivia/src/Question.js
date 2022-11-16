import React from 'react'
import QuestionCSS from './Question.module.css'
import Answer from './Answer'

export default function Question(props) {
    const {questionNumber, question, rightAnswer, randomizedAnswers, selectedAnswer, gameOver, handleSelect} = props

    /*Maps over the 4 answers for the question and creates an Answer component for each one.*/
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

    /*Renders the question tile. The upper part consists of question number and question text. The lower
    part is an array of Answer components.*/
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