import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import Styles from './InputWord.module.css'
import evalBool from './../../global'
export default function InputWord(props) {
    const [inputText, setInputText] = useState("");
    const langCode = props.code || 'en';

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            //attempt to translate
            const sourceLanguage = 'english';
            const api = `?${sourceLanguage}=${inputText}&code=${langCode}`
            var endPoint = process.env.REACT_APP_HOST;
            if (evalBool(process.env.REACT_APP_DEV_MODE)) {
                endPoint = "http://localhost:4000"
            }
            fetch(`${endPoint}/translate/word${api}`, {mode: 'cors'})
                .then(res => res.json())
                .then(data => {
                    console.log("TranslateRequest::data::")
                    console.log(data)
                    props.addWord(inputText, data.japanese)
                })
                .catch(err => console.error(err))
            setInputText("")
        } else {
            alert("Please enter a word!")
        }
    };

    return (
        <form className={Styles.formContainer} onSubmit={handleSubmit}>
            <input 
                type="text"
                className={Styles.inputText}
                placeholder="Add Word..."
                value={inputText}
                name="word"
                onChange={onChange}
            />
            <button className={Styles.inputSubmit}>
                <FaPlusCircle 
                    style={{color: "darkcyan", fontSize: "20px", marginTop: "2px"}}
                />
            </button>
        </form>
    )
}
