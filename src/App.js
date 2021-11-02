import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import "./App.css"
import "./index.css"
import evalBool from "./global";
import NavBar from "./components/NavBar";
import NavItem from "./components/NavItem";
import DropDownMenu from "./components/DropDownMenu";
import EditBody from "./components/EditBody/EditBody";

import { ReactComponent as BoltIcon } from "./icons/bolt.svg"
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { ReactComponent as PlusIcon } from "./icons/plus.svg"
import ReviewBody from "./components/ReviewBody";

const App = () => {

    const [user, setUser] = useState({});
    console.log("user",user)
    const [reviewing, setReviewing] = useState(false)

    const updateReviewing = () => {
        setReviewing(!reviewing)
    };

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
                //console.log("Response: ", response)
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
                            <NavItem icon={reviewing ? <PlusIcon /> : <BoltIcon />} desc={"Start Reviewing"} drop={false} action={updateReviewing}/>
                            <NavItem icon={<ArrowIcon />} desc={"Logout"} drop={false}/>
                            <NavItem icon={<CaretIcon />} desc={"DropDown Menu"} drop={true}>
                                <DropDownMenu />
                            </NavItem>
                        </NavBar>
                        {/* {user ? <HomePage /> : <Redirect to="/login" />} */}
                        {user ? (reviewing ? <ReviewBody /> : <EditBody />) : <Redirect to="/login" /> }
                        {/* {reviewing ? <ReviewBody /> : <EditBody />} */}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;