import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import "./App.css"
import evalBool from "./global";


const App = () => {

    const [user, setUser] = useState({});


    useEffect(() => {
        var endPoint = "";
        console.log("Checking to see if user is logged in")
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
                let u = data.user;
                setUser(u);
            })
            .catch(err => {
                console.log("Got error instead");
                console.error(err)});
    }, [])


    return(
        <div className="app-container"> 
            <BrowserRouter>
                <Switch>
                    
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/' exact>
                        {user ? <HomePage /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;