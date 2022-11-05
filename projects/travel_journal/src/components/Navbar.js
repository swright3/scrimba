import React from 'react'
import NavbarCSS from './Navbar.module.css'
import globe from '../images/globe.png'

export default function Navbar() {
    return (
        <nav className={NavbarCSS.Navbar}>
            <img src={globe} alt='globe' width='50px' />
            <h1>sam's travel journal</h1>
        </nav>
    )
}