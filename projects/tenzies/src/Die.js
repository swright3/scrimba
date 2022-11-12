import React from "react"

export default function Die(props) {
    const styles = {
        color: props.isHeld ? "white" : "#c20606",
        backgroundColor: props.isHeld ? "#c20606" : "white"
    }

    function getDots() {
        switch (props.value) {
            case 1:
                return (
                    <div className="dots">
                    <div></div><div></div><div></div>
                    <div></div><div>&#8226;</div><div></div>
                    <div></div><div></div><div></div>
                    </div>
                )
            case 2:
                return (
                    <div className="dots">
                    <div>&#8226;</div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div>&#8226;</div>
                    </div>
                )
            case 3:
                return (
                    <div className="dots">
                    <div>&#8226;</div><div></div><div></div>
                    <div></div><div>&#8226;</div><div></div>
                    <div></div><div></div><div>&#8226;</div>
                    </div>
                )
            case 4:
                return (
                    <div className="dots">
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    <div></div><div></div><div></div>
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    </div>
                )
            case 5:
                return (
                    <div className="dots">
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    <div></div><div>&#8226;</div><div></div>
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    </div>
                )
            case 6:
                return (
                    <div className="dots">
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    <div>&#8226;</div><div></div><div>&#8226;</div>
                    </div>
                )
        }
    }

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {props.dots ? getDots() : props.value}
        </div>
    )
}