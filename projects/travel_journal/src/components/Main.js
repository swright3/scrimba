import React from "react"
import MainCSS from './Main.module.css'
import data from '../data.js'
import Trip from './Trip'

export default function Main() {

    const trips = data.map(trip => <Trip id={trip.name} info={trip} />)

    return (
        <section className={MainCSS.Main}>
            {trips}
        </section>
    )
}