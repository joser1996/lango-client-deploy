import React from 'react'
import WordItem from '../WordItem/WordItem'

export default function WordList(props) {
    return (
        <ul>
            {props.words.map(word => (
                <WordItem 
                    key={word.id}
                    word={word}
                    updateWord={props.updateWord}
                    deleteWord={props.deleteWord}
                />
            ))}
        </ul>
    )
}
