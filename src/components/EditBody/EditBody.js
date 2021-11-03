import React, { useState, useEffect } from 'react'
import Header from '../Header';
import InputWord from '../InputWord/InputWord';
import WordList from '../WordList/WordList';
import Styles from './EditBody.module.css';
import { v4 as uuidv4 } from "uuid";
import evalBool from '../../global';
import SubmitButton from '../SubmitButton/SubmitButton';


export default function EditBody() {
    //TODO: Handle language dynamically; handle as state
    const [words, setWords] = useState(getSavedWords() || []);

    const addBufferedWord = (word, translated) => {
        const newWord = {
            id: uuidv4(),
            native: word,
            translated: translated
        }
        setWords([...words, newWord]);
    };

    useEffect(() => {
        const temp = JSON.stringify(words);
        localStorage.setItem("words", temp);
    }, [words])

    function getSavedWords() {
        let buffer = localStorage.getItem('words');
        let localCards = JSON.parse(buffer) || [];
        return localCards;
    };

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

    function deleteBuffer() {
        localStorage.removeItem('words');
    }

    const saveBuffer = () => {
        console.log("SAVING")
        //take buffer
        let buffer = getSavedWords();
        if (buffer.length === 0){
            console.log("Early Return");
            return;
        }
        //create json
        const bufferJson = JSON.stringify(buffer);
        console.log("We are sending: ", bufferJson)
        //POST to backend
        var endPoint = "";
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        } else {
            endPoint = process.env.REACT_APP_HOST;
        }

        fetch(`${endPoint}/store/cards`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bufferJson
        }).then(response => {
            return response.json();
        })
        .then(data => {
            console.log("WE GOT: ", data);
            console.log("Clearing buffer");
            deleteBuffer();
            setWords(getSavedWords());
            alert("Words have been added to Data Base")
        })
        .catch(err => {
            console.log("SHIT HIT THE FAN");
            console.log(err)
        })

    }

    return (
        <div className={Styles.editBody}>
            <Header language={"Japanese"}/>
            <InputWord addWord={addBufferedWord}/>
            <WordList words={words} updateWord={updateWord} deleteWord={deleteWord} updateTranslated={updateTranslatedWord}/>
            <SubmitButton visible={words.length} saveBuffer={saveBuffer}/>
        </div>
    )
}
