import React, { useState } from 'react'
import Header from '../Header';
import InputWord from '../InputWord/InputWord';
import WordList from '../WordList/WordList';
import Styles from './EditBody.module.css';
import { v4 as uuidv4 } from "uuid";
import evalBool from '../../global';
import SubmitButton from '../SubmitButton/SubmitButton';


export default function EditBody() {
    //TODO: Handle language dynamically; handle as state
    const [words, setWords] = useState([])

    const addBufferedWord = (word, translated) => {
        const newWord = {
            id: uuidv4(),
            native: word,
            translated: translated
        }
        setWords([...words, newWord]);
    };

    function translateWord(word) {
        const sourceLanguage = 'english';
        const api = `?${sourceLanguage}=${word}`
        var endPoint = process.env.REACT_APP_HOST;
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        }
        var newWord = undefined;
        fetch(`${endPoint}/translate/word${api}`, {mode: 'cors'})
        .then(res => res.json())
        .then(data => {
            console.log("TranslateRequest::data::")
            console.log(data)
            newWord = data.japanese;
            return newWord
        })
        .catch(err => console.error(err))
        return newWord;
    }

    const updateTranslatedWord = (word, id) => {
        const sourceLanguage = 'english';
        const api = `?${sourceLanguage}=${word}`
        var endPoint = process.env.REACT_APP_HOST;
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        }
        var newWord = undefined;
        fetch(`${endPoint}/translate/word${api}`, {mode: 'cors'})
        .then(res => res.json())
        .then(data => {
            console.log("TranslateRequest::data::")
            console.log(data)
            newWord = data.japanese;
            setWords(
                words.map(w => {
                    if (w.id === id) {
                        w.translated = newWord
                    }
                    return w;
                })
            )
        })
        .catch(err => console.error(err))
    }

    const updateWord = (updatedWord, id) => {
        setWords(
            words.map(word => {
                if (word.id === id) {
                    word.native = updatedWord;
                }
                return word;
            })
        );
    };

    const deleteWord = (id) => {
        setWords([
            ...words.filter( word => {
                return word.id !== id
            })
        ]);
    };

    return (
        <div className={Styles.editBody}>
            <Header language={"Japanese"}/>
            <InputWord addWord={addBufferedWord}/>
            <WordList words={words} updateWord={updateWord} deleteWord={deleteWord} updateTranslated={updateTranslatedWord}/>
            <SubmitButton visible={words.length}/>
        </div>
    )
}
