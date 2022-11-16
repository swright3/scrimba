import React, {useState} from 'react'
import IntroCSS from './Intro.module.css'

export default function Intro(props) {
    const [formData, setFormData] = useState({
        name: '',
        difficulty: 'mixed',
        category: 'any'
    })
    const {startQuiz} = props

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className={IntroCSS.Intro}>
            <div className={`${IntroCSS.title} ${IntroCSS.titleAnimation}`}>
                <h1>Quizzical</h1>
                <h2>The randomized trivia app</h2>
            </div>
            <form>
                <input type='text' placeholder='Name' onChange={handleChange} name='name' value={formData.name}/>
                <select id='difficulty' value={formData.difficulty} onChange={handleChange} name='difficulty'>
                    <option value='mixed'>Mixed</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <select id='category' value={formData.category} onChange={handleChange} name='category'>
                    <option value='any'>All Categories</option>
                    <option value='generalKnowledge'>General Knowledge</option>
                    <option value='scienceAndNature'>Science & Nature</option>
                    <option value='sports'>Sports</option>
                </select>
                <button onClick={startQuiz}>Start Quiz!</button>
            </form>
        </div>
    )
}