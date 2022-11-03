import React from 'react'
import InfoCSS from './Info.module.css'
import me from '../images/me.jpg'
import email from '../images/email.png'
import linkedin from '../images/linkedin.png'
import linkedinButton from '../images/linkedin.png'

export default function Info() {
    return (
        <div className={InfoCSS.Info}>
            <img src={me} width="300px" height="auto" className={InfoCSS.profilepic}/>
            <h1 className={InfoCSS.name}>Sam Wright</h1>
            <p className={InfoCSS.title}>Full Stack Developer</p>
            <div className={InfoCSS.buttons}>
                <a href='mailto:samwrighthwk@gmail.com' className={InfoCSS.email}></a>
                <a href='https://www.linkedin.com/in/swright31/' className={InfoCSS.linkedin}></a>
            </div>
        </div>
    )
}