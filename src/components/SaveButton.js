import React from 'react'
import evalBool from '../global';
import styles from '../pages/HomePage.module.css'
export default function SaveButton(props) {
    const storeWords = () => {
        if(props.wordsProps != null) {
            console.log("Storing Words: ", props.wordsProps);
            const {english, japanese} = props.wordsProps;
            if (english && japanese) {
                console.log("Sending store request");
                var endPoint = process.env.REACT_APP_HOST;
                if (evalBool(process.env.REACT_APP_DEV_MODE)) {
                    endPoint = "http://localhost:4000"
                }
                let url = `${endPoint}/store/words?english=${english}&japanese=${japanese}`
                fetch(url, {credentials: 'include'})
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
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
