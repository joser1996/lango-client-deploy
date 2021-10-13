import React, { createContext, useEffect, useState } from 'react'
import evalBool from '../global';
export const myContext = createContext({});

export default function Context(props) {
    const [userObject, setUserObject] = useState();
    
    useEffect(()=> {
        var endPoint = "";
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        } else {
            endPoint = process.env.REACT_APP_HOST;
        }
        fetch(`${endPoint}/get/user`, { credentials: 'include' })
            .then(response => {
                console.log("Response: ", response)
                return response.json()
            })
            .then(data => {
                console.log("Got User: ", data);
                let user = data.user;
                if (user) {
                    setUserObject(user)
                }// else {
                //     if (window.location.href !== 'http://localhost:3000/login') {
                //         window.location = '/login';
                //     }
                // }
            })
            .catch(err => {
                console.log("Got error instead");
                // if (window.location.href !== 'http://localhost:3000/login'){
                //     window.location = '/login'
                // }
                console.error(err)});
    }, []);
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
