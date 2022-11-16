import React from 'react'
import IntroCSS from './Intro.module.css'

export default function Intro(props) {
    const {startQuiz} = props

    return (
        <div className={IntroCSS.Intro}>
            <h1>Quizzical</h1>
            <h2>The randomized trivia app</h2>
            <button onClick={startQuiz}>Start Quiz!</button>
        </div>
    )
}