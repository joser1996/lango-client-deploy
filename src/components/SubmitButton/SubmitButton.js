import React from 'react'
import { AiFillSave } from 'react-icons/ai';
import styles from './SubmitButton.module.css';

export default function SubmitButton(props) {

    const numWords = props.visible;
    var visible = {};
    if (numWords === 0) {
        visible.display = 'none'
    }

    return (
        <div className={styles.buttonContainer} style={visible}>
            <button className={styles.submitButton} onClick={props.saveBuffer}>
                <AiFillSave 
                    style={{color: "darkcyan", fontSize: "40px", marginTop: "2px"}}
                />
            </button>
        </div>

    )
}
