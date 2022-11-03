import React from 'react'
import FooterCSS from './Footer.module.css'
import facebookpng from '../images/facebook.png'
import twitterpng from '../images/twitter.png'
import instapng from '../images/instagram.png'
import githubpng from '../images/github-sign.png'

export default function Footer() {
    return (
        <div className={FooterCSS.Footer}>
             <a href='https://facebook.com'>
                <img src={facebookpng} alt='facebook' width='45px'/>
             </a>
             <a href='https://twitter.com'>
                <img src={twitterpng} alt='twitter' width='45px'/>
             </a>
             <a href='https://instagram.com'>
                <img src={instapng} alt='instagram' width='45px'/>
             </a>
             <a href='https://github.com/swright3/'>
                <img src={githubpng} alt='github' width='45px'/>
             </a>
        </div>
    )
}