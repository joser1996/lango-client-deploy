import React, { useState }from 'react'
import { FaTrash } from 'react-icons/fa'
import Styles from './WordItem.module.css'

export default function WordItem(props) {

    const [editing, setEditing] = useState(false)
    const {native, id, translated} = props.word;

    const handleEditing = () => {
        setEditing(true);
    };

    const handleUpdateDown = (event) => {
        if (event.key === "Enter") {
            setEditing(false);
            props.updateTranslated(native, id);
        }
    };

    let viewMode = {}
    let editMode = {}

    if (editing) {
        viewMode.display = 'none';
    } else {
        editMode.display = 'none';
    }
    return (
        <li className={Styles.item}>
            <div style={viewMode} onDoubleClick={handleEditing} className={Styles.border}>
                <button onClick={() => props.deleteWord(id)}>
                    <FaTrash 
                        style={{ color: "orangered", fontSize: "16px" }}
                    />
                </button>
                <div className={Styles.wordPair}> 
                    <span>{native}</span>
                    <span>{translated}</span>
                </div>
            </div>
            <input 
                type="text"
                style={editMode}
                className={Styles.textInput} 
                value={native}
                onChange={e => {props.updateWord(e.target.value, id)}}
                onKeyDown={handleUpdateDown}
            />
        </li>
    )
}
