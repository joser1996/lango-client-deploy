import React from 'react'
import styles from '../pages/HomePage.module.css';

export default function BlinkingInput(props) {

    return (
        <div className={`${styles.reviewInputCard} ${props.blinking ? styles.blinking : ""}`} >
            <textarea 
                id="reviewTextArea" 
                value={props.answer}
                onKeyPress={props.checkAns}
                onChange={props.onChange}>
            </textarea>
        </div>
    )
}
