import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import styles from '../pages/HomePage.module.css';
import BlinkingInput from './BlinkingInput';

export default function ReviewBody(props) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    
    const handleBlinking = ()=> {
        setIsBlinking(true);
        setTimeout(() => {
            setIsBlinking(false);
        }, 1000);
    };


    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const checkAns = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            const wordOne = props.currentPair['word_one'];
            const answer = props.answer;
            if (wordOne.toLowerCase() === answer.toLowerCase()) {
                //correct
                console.log('Correct')
                props.updateIndex();
                props.updateAnswer("");
            } else {
                //Incorrect
                console.log('Incorrect')
                handleBlinking();
            }
        }       
    };

    const nextCard = () => {
        console.log("Next card")
        props.updateIndex();
    };

    const onChange = (event) => {
        props.updateAnswer(event.target.value);
    };

    
    return (
        <main id={styles.langoMain}>

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="location-front-item" id={styles.reviewTextCard} onClick={handleClick}>
                    <p id="pReview">{props.currentPair ? props.currentPair['word_two'] : ""}</p>
                </div>

                <div className="location-back-item" id={styles.reviewTextCard} onClick={handleClick}>
                    <p id="pReview">{props.currentPair ? props.currentPair['word_one'] : ""}</p>
                </div>
            </ReactCardFlip>   


            <BlinkingInput blinking={isBlinking} answer={props.answer} checkAns={checkAns} onChange={onChange}/>

            <div id={styles.nextButtonDiv}>
                <button id={styles.nextButton} onClick={nextCard}>Next</button>             
            </div>
        </main>
    )
    
}
