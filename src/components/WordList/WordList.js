import React from 'react'
import WordItem from '../WordItem/WordItem'
import style from './WordList.module.css'

export default function WordList(props) {
    return (
        <ul className={style.wordList}>
            {props.words.map(word => (
                <WordItem 
                    key={word.id}
                    word={word}
                    updateWord={props.updateWord}
                    updateTranslated={props.updateTranslated}
                    deleteWord={props.deleteWord}
                />
            ))}
        </ul>
    )
}
 
        // //get cards from database
        // let endPoint = process.env.REACT_APP_HOST;
        // if (evalBool(process.env.REACT_APP_DEV_MODE)) {
        //     endPoint = "http://localhost:4000"
        // }
        // let url = `${endPoint}/get/cards`
        // let response = await fetch(url, {credentials: 'include'})
        // let data = await response.json();
        // console.log(data, 'here');
        // let cards = data.data;
        // let temp = []
        // for (const card of cards) {
        //     let newCard = {
        //         id: card._id,
        //         native: card.word_one,
        //         translated: card.word_two
        //     }
        //     temp.push(newCard);
        // }