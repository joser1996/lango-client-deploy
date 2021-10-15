import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import styles from '../pages/HomePage.module.css';

export default function ReviewBody(props) {

    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const checkAns = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            const wordOne = this.props.currentPair['word_one'];
            const answer = this.props.answer;
            if (wordOne.toLowerCase() === answer.toLowerCase()) {
                //correct
                console.log('Correct')
                this.props.updateIndex();
                this.props.updateAnswer("");
            } else {
                //Incorrect
                console.log('Incorrect')
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
            {/* <div id={styles.reviewTextCard}>
                <p id="pReview">{this.props.currentPair? this.props.currentPair['word_two']: ""}</p>
            </div> */}

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="location-front-item" id={styles.reviewTextCard} onClick={handleClick}>
                    <p id="pReview">{props.currentPair ? props.currentPair['word_two'] : ""}</p>
                </div>

                <div className="location-back-item" id={styles.reviewTextCard} onClick={handleClick}>
                    <p id="pReview">{props.currentPair ? props.currentPair['word_one'] : ""}</p>
                </div>
            </ReactCardFlip>   


            <div id={styles.reviewInputCard}>
                <textarea 
                    id="reviewTextArea" 
                    value={props.answer}
                    onKeyPress={checkAns}
                    onChange={onChange}>
                </textarea>
            </div>
            <div id={styles.nextButtonDiv}>
                <button id={styles.nextButton} onClick={nextCard}>Next</button>             
            </div>
        </main>
    )
    
}
