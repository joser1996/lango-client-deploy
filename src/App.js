import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import "./App.css"
import "./index.css"
import evalBool from "./global";
import NavBar from "./components/NavMenu/NavBar";
import NavItem from "./components/NavMenu/NavItem";
import DropDownMenu from "./components/NavMenu/DropDownMenu";
import EditBody from "./components/EditBody/EditBody";

import { ReactComponent as BoltIcon } from "./icons/bolt.svg"
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { ReactComponent as PlusIcon } from "./icons/plus.svg"
import ReviewBody from "./components/ReviewBody";

const App = () => {

    //Let user update deck that is active by clicking

    const [user, setUser] = useState({});
    const [reviewing, setReviewing] = useState(false)
    const [deckName, setDeckName] = useState('First')
    const [language, setLanguage] = useState(null)
    const [langCode, setLangCode] = useState('ja')
    const [decks, setDecks] = useState([])


    const langTable = {
        'ja': '日本語',
        'ko': '한국어',
        'it': 'Italiano',
        'fr': 'Français',
        'es': 'Español',
        'de': 'Deutsch',
        'ar': 'العربية'
    }

    // Whenver langcode is updated; update language(human readable)
    useEffect(() => {
        let l = langTable[langCode];
        setLanguage(l);
    }, [langCode])

    // Checking to see if user object exists; logged in
    useEffect(() => {
        var endPoint = "";
        //console.log("Checking to see if user is logged in")
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
       //         console.log("Got User: ", data);
                let u = data.user;
                setUser(u);
            })
            .catch(err => {
                console.log("Got error instead");
                console.error(err)});
    }, [])

    const updateReviewing = () => {
        setReviewing(!reviewing)
    };

    const updateDeckName = (using) => {
        setDeckName(using);
    }

    // Get Decks
    useEffect(() => {
        var endPoint = process.env.REACT_APP_HOST;
        //console.log("Checking to see if user is logged in")
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        }
        let url = endPoint + '/get/decks'
        fetch(url, {credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            console.log("Got data: ", data);
            if (data.success) {
                let decks = data.data;
                console.log(decks);
                setDecks(decks);
            }
        })

    }, [deckName])

    const logout = () => {
        console.log('Logging out');
        var endPoint = "";
        //console.log("Checking to see if user is logged in")
        if (evalBool(process.env.REACT_APP_DEV_MODE)) {
            endPoint = "http://localhost:4000"
        } else {
            endPoint = process.env.REACT_APP_HOST;
        }
        fetch(`${endPoint}/logout`, {credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            console.log("GOT", data);
            let url = data.url;
            window.location.assign(url);
        })
        .catch(err => console.error('ERR: ', err));
    }

    const updateLanguage = (lang) => {
        console.log("Updating to: ", lang);
        setLangCode(lang);
    };

    return(
        <div className="app-container"> 
            <BrowserRouter>
                <Switch>
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/' exact>
                        <NavBar deck={deckName}>
                            {/* Review Button */}
                            <NavItem icon={reviewing ? <PlusIcon /> : <BoltIcon />} desc={"Start Reviewing/Edit"} drop={false} action={updateReviewing}/>
                            <NavItem icon={<ArrowIcon />} desc={"Logout"} drop={false} action={logout}/>
                            <NavItem icon={<CaretIcon />} desc={"DropDown Menu"} drop={true}>
                                <DropDownMenu updateLanguage={updateLanguage} decks={decks} updateDeck={updateDeckName}/>
                            </NavItem>
                        </NavBar>
                        {user ? (reviewing ? <ReviewBody deck={deckName}/> : <EditBody language={language} code={langCode} deck={deckName}/>) : <Redirect to="/login" /> }
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;