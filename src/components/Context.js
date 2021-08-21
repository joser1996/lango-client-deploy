import React, { createContext, useEffect, useState } from 'react'
export const myContext = createContext({});

export default function Context(props) {
    const [userObject, setUserObject] = useState();
    useEffect(()=> {
        fetch(`${process.env.REACT_APP_HOST}/get/user`, { credentials: 'include' })
            .then(response => {
                //console.log("Response: ", response)
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
