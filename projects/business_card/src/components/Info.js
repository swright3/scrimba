import React from 'react'
import me from '../images/me.jpg'
import email from '../images/email.png'
import linkedin from '../images/linkedin.png'

export default function Info() {
    return (
        <div className='Info'>
            <img src={me} width="300px" height="auto" className='profilepic'/>
            <h1>Sam Wright</h1>
            <p className='title'>Full Stack Developer</p>
            <div className='buttons'>
                <a href='mailto:samwrighthwk@gmail.com' className='email'>
                    <img src={email} width="10px" height="auto" className='emailpic'/>
                    <p className='emailtext'>Email</p>
                </a>
                <a href='https://www.linkedin.com/in/swright31/' className='linkedin'>
                    <img src={linkedin} width="10px" height="auto" className='linkedinpic' />
                </a>
            </div>
        </div>
    )
}