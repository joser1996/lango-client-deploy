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
 