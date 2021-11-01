import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import "./App.css"
import "./index.css"
import evalBool from "./global";
import NavBar from "./components/NavBar";
import NavItem from "./components/NavItem";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg"
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"

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
                        <NavBar>
                            {/* Review Button */}
                            <NavItem icon={<BoltIcon />} />
                            <NavItem icon={<ArrowIcon />} />
                            <NavItem icon={<CaretIcon />} />
                        </NavBar>
                        {/* {user ? <HomePage /> : <Redirect to="/login" />} */}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;