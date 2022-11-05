import React from "react"
import TripCSS from './Trip.module.css'
import pin from '../images/pin.png'

export default function Trip(props) {
    return (
        <article className={TripCSS.Trip}>
            <img src={props.info.imageUrl} className={TripCSS.portrait} alt='location pic' width='100px'/>
            <div className={TripCSS.info}>
                <div className={TripCSS.location}>
                    <img src={pin} alt='pin' width='20px'/>
                    {props.info.location}
                    <a href={props.info.googleMapsUrl}>Open in Google Maps</a>
                </div>
                <h2>{props.info.title}</h2>
                <p className={TripCSS.date}>
                    {props.info.startDate} - {props.info.endDate}
                </p>
                <p className={TripCSS.desc}>{props.info.description}</p>
            </div>
        </article>
    )
}