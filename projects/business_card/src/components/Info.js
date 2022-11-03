import React from 'react'
import InfoCSS from './Info.module.css'
import me from '../images/me.jpg'
import email from '../images/email.png'

export default function Info() {
    return (
        <div className={InfoCSS.Info}>
            <img src={me} width="300px" height="auto" className={InfoCSS.profilepic}/>
            <h1 className={InfoCSS.name}>Sam Wright</h1>
            <p className={InfoCSS.title}>Full Stack Developer</p>
            <div className={InfoCSS.buttons}>
                <a href='mailto:samwrighthwk@gmail.com' className={InfoCSS.email}>
                    <div className={InfoCSS.emailContent}>
                        <img src={email} width='50px'/>
                        <p>Email</p>
                    </div>
                </a>
                <a href='https://www.linkedin.com/in/swright31/' className={InfoCSS.linkedin}></a>
            </div>
        </div>
    )
}