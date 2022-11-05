import React from "react"
import TripCSS from './Trip.module.css'
import pin from '../images/pin.png'

export default function Trip(props) {
    return (
        <article className={TripCSS.Trip}>
            <img src={props.info.imageUrl} alt='location pic' width='100px'/>
            <div className={TripCSS.info}>
                <div className={TripCSS.location}>
                    <img src={pin} alt='pin' width='20px'/>
                    <p>{props.info.location}</p>
                    <a href={props.info.googleMapsUrl}/>
                </div>
            </div>
        </article>
    )
}