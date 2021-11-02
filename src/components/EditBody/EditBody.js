import React from 'react'
import Header from '../Header';
import InputWord from '../InputWord/InputWord';
import Styles from './EditBody.module.css';


export default function EditBody() {
    //TODO: Handle language dynamically; handle as state


    return (
        <div className={Styles.editBody}>
            <Header language={"Japanese"}/>
            <InputWord />
        </div>
    )
}
