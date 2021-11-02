import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import Styles from './InputWord.module.css'

export default function InputWord(props) {
    const [inputText, setInputText] = useState();

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            props.addWord(inputText);
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
