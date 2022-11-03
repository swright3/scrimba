import React from 'react'
import InterestsCSS from './Interests.module.css'

export default function Interests() {
    return (
        <div className={InterestsCSS.Interests}>
            <h2>Interests</h2>
            <div className={InterestsCSS.container}>
                <p>Web Development</p>
                <p>Climbing</p>
                <p>Cycling</p>
                <p>Bass Guitar</p>
                <p>German</p>
            </div>
        </div>
    )
}

/*             <ul>
                <li>Web Development</li>
                <li>Climbing</li>
                <li>Bass Guitar</li>
                <li>Cycling</li>
            </ul> */