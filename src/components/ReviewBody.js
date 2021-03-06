import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip';
import evalBool from '../global';
import styles from '../pages/HomePage.module.css';
import BlinkingInput from './BlinkingInput';

export default function ReviewBody(props) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);

    const [answer, setAnswer] = useState("");
 
    const nextCard = () => {
        console.log("Next card")
        let tempIndex = cardIndex + 1;
        if (tempIndex >= cards.length) {
            setCardIndex(0);
        } else {
            setCardIndex(tempIndex);
        }
        
    }; 
    const deckName = props.deck;

    useEffect(() => {
        var endPoint = process.env.REACT_APP_HOST;
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        }
        let url = `${endPoint}/get/cards?deck=${deckName}`
        fetch(url, {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                let cards = data.data;
                console.log("Got cards: ", cards);
                for (let i = 0; i < cards.length; i++) {
                    cards[i].correct = false;
                }
                setCards(cards);
            })
            .catch(err => console.error("ERR: ", err));
    }, [deckName])

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
            const wordOne = cards[cardIndex].word_one
            if (wordOne.toLowerCase() === answer.toLowerCase()) {
                //correct
                console.log('Correct')
                setIsCorrect(true);
                setTimeout(() => {
                    setIsCorrect(false);
                    setAnswer("");
                    nextCard();
                }, 1000);
            } else {
                //Incorrect
                console.log('Incorrect')
                handleBlinking();
            }
        }       
    };


    const onChange = (event) => {
        let ans = event.target.value;
        setAnswer(ans);
    };

    
    return (
        <main id={styles.langoMain}>

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className={`${styles.reviewTextCard} location-front-item ${isCorrect ? styles.correct : ""}` } onClick={handleClick}>
                    <p id="pReview">{cards[cardIndex] ? cards[cardIndex].word_two : ""}</p>
                </div>

                <div className={`${styles.reviewTextCard} location-back-item ${isCorrect ? styles.correct : ""}`} onClick={handleClick}>
                    <p id="pReview">{cards[cardIndex] ? cards[cardIndex].word_one : ""}</p>
                </div>
            </ReactCardFlip>   


            <BlinkingInput blinking={isBlinking} answer={answer} checkAns={checkAns} onChange={onChange}/>

            <div id={styles.nextButtonDiv}>
                <button id={styles.nextButton} onClick={nextCard}>Next</button>             
            </div>
        </main>
    )
    
}
