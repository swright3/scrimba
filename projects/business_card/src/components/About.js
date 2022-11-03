import React from 'react'
import AboutCSS from './About.module.css'

export default function About() {
    return (
        <div className={AboutCSS.About}>
            <h2>About</h2>
            <p>University of Warwick graduate in BSc Computer Science,
                 currently looking for employment in Berlin.
                 I have loved my time here so far and am
                  determined to stay over here and find a career.</p>
        </div>
    )
}