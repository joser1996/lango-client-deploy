import React from 'react'
import reactDom from 'react-dom';
import styles from '../pages/HomePage.module.css'
export default function SaveButton(props) {
    const storeWords = () => {
        if(props.wordsProps != null) {
            console.log("Storing Words: ", props.wordsProps);
            const {english, japanese} = props.wordsProps;
            if (english && japanese) {
                let url = `${process.env.REACT_APP_HOST}/store/words?english=${english}&japanese=${japanese}`
                fetch(url, {credentials: 'include'})
                    .then(res => res.json())
                    .then(data => {
                        if (data.status) {
                            console.log("Clearing")
                            props.updateWordsProps({english: "", japanese: ""})
                        }
                    })
                    .catch(err => console.error("ERR: ", err));
            }
            //once we're done clear the cards
        }
    };

    return (
        <button className={styles.butt} onClick={storeWords}>Save</button>
    )
}
