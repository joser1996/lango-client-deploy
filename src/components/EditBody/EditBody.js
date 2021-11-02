import React, { useState } from 'react'
import Header from '../Header';
import InputWord from '../InputWord/InputWord';
import WordList from '../WordList/WordList';
import Styles from './EditBody.module.css';
import { v4 as uuidv4 } from "uuid";


export default function EditBody() {
    //TODO: Handle language dynamically; handle as state
    const [words, setWords] = useState([])

    const addBufferedWord = (word) => {
        const newWord = {
            id: uuidv4(),
            word: word
        }
        setWords([...words, newWord]);
    };

    return (
        <div className={Styles.editBody}>
            <Header language={"Japanese"}/>
            <InputWord addWord={addBufferedWord}/>
            <WordList words={words}/>
        </div>
    )
}
