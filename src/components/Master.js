import React, { useEffect, useState } from 'react'
import LangoHeader from './LangoHeader'
import MainBody from './MainBody'
import ReviewBody from './ReviewBody'
import LangoFooter from './LangoFooter'
import Styles from '../pages/HomePage.module.css'
import evalBool from '../global'

export default function Master() {
    const [reviewing, setReviewing] = useState(false);
    const [cards, setCards] = useState({});
    const [cardIndex, setCardIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        if (reviewing) {
            console.log("Getting Flash cards")
            var endPoint = process.env.REACT_APP_HOST;
            if (evalBool(process.env.REACT_APP_DEV_MODE)) {
                endPoint = "http://localhost:4000"
            }
            fetch(`${endPoint}/get/cards`, {mode: 'cors', credentials: 'include'})
                .then(res => res.json())
                .then(data => {
                    console.log('Recieved:', data)
                    if (!data.success) {
                        console.log('Failed to get cards')
                        setCards([]);
                    } else {
                        setCards(data.data);
                    }
                }).catch(err => console.error('Error: ', err));
        }
    }, [reviewing])

    const updateReviewing = () => {
        setReviewing(!reviewing);
    };

    const updateAnswer = (ans) => {
        setAnswer(ans);
    };

    const updateIndex = () => {
        setCardIndex(prevIndex => {
            let index = prevIndex + 1;
            if (cards.length === index){
                index = 0;
            }
            console.log("Index updated to: ", index);
            return index;
        });
    }

    return (
        <div id={Styles.masterDiv}>
            <LangoHeader reviewingProps={reviewing} updateReviewingProps={updateReviewing}/>
            {reviewing ? (<ReviewBody answer={answer} updateAnswer={updateAnswer} cardsProps={cards} cardIndex={cardIndex} updateIndex={updateIndex} currentPair={cards[cardIndex]}/>) : (<MainBody />)}
            <LangoFooter />
        </div>
    )
}
