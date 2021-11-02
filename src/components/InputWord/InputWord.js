import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import Styles from './InputWord.module.css'

export default function InputWord() {
    const [inputText, setInputText] = useState();

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    return (
        <form className={Styles.formContainer}>
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
