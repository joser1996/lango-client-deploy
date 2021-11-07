import React, { useRef, useState, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import evalBool from '../../global';
import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg'
import {ReactComponent as PlusIcon} from '../../icons/plus.svg'

export default function DropDownMenu(props) {
    const [activeMenu, setactiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const decks = props.decks;

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 25)
    }, [])

    function calcHeight(el) {
        var height = el.offsetHeight;
        height = height + 25;
        setMenuHeight(height);
    } 

    function DropDownItem(props) {

        const handleClick = () => {
            if (props.goToMenu) {
                setactiveMenu(props.goToMenu);
            }
            if (props.action && props.code) {
                props.action(props.code)
            }

            if (props.action && props.deckName) {
                console.log("This working")
                props.action(props.deckName)
            }
        }

        return(
            <a href="#" className="menu-item" onClick={handleClick}>
                {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> :undefined}
                {props.children}
                {props.rightIcon ? <span className="icon-right">{props.rightIcon}</span> : undefined}
            </a>
        );
    }

    const updateDeck = props.updateDeck;

    function InputItem(props) {
        const [name, setName] = useState("");
        const [editing, setEditing] = useState(false);

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                if (name !== "") {
                    //Attempt to save to database
                    var endPoint = process.env.REACT_APP_HOST;
                    if (evalBool(process.env.REACT_APP_DEV_MODE)) {
                        endPoint = "http://localhost:4000"
                    }
                    let url = endPoint + '/create/deck' + `?deck=${name}`
                    fetch(url, {credentials: 'include'})
                    .then(res => res.json())
                    .then(data => {
                        console.log("We got data: ", data);
                        if (data.status) {
                            let status = data.status;
                            if (status === 'success') {
                                updateDeck(name);
                                alert('Deck created');
                            } else if(status === 'duplicate') {
                                alert('Deck already exists')
                            } else if(status === 'fail') {
                                alert('Something went wrong')
                                console.error(data.error);
                            } 
                            setName("")
                        }
                    })
                    .catch(err => console.error('ERR: ', err));
                }
                setEditing(false);
            }
        }

        const handleEditing = () => {
            setEditing(true);
        }

        let viewMode = {}
        let editMode = {}

        if (editing) {
            viewMode.display = 'none';
        } else {
            editMode.display = 'none'
        }
        return(
            <div className="input-item-container">
                <h2 style={viewMode} onDoubleClick={handleEditing}>{props.children}</h2>
                
                <input 
                    type="text"
                    value={name}
                    onChange={e => {setName(e.target.value)}}
                    style={editMode}
                    onKeyDown={handleKeyDown}
                />
            </div>
 
        );
    }

    return (
        <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropDownItem goToMenu="language">Change Language</DropDownItem>
                    <DropDownItem goToMenu="decks">Change Deck</DropDownItem>
                </div>
            </CSSTransition>
 
            <CSSTransition
                in={activeMenu === "language"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropDownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Go Back</h2>
                    </DropDownItem>
                    <DropDownItem code={'ja'} action={props.updateLanguage}>日本語</DropDownItem>
                    <DropDownItem code={'ko'} action={props.updateLanguage}>한국어</DropDownItem>
                    <DropDownItem code={'it'} action={props.updateLanguage}>Italiano</DropDownItem>
                    <DropDownItem code={'fr'} action={props.updateLanguage}>Français</DropDownItem>
                    <DropDownItem code={'es'} action={props.updateLanguage}>Español</DropDownItem>
                    <DropDownItem code={'de'} action={props.updateLanguage}>Deutsch</DropDownItem>
                    <DropDownItem code={'ar'} action={props.updateLanguage}>العربية</DropDownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "decks"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropDownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Go Back</h2>
                    </DropDownItem>

                    {/* Default Deck */}
                    <DropDownItem deckName={'First'} action={props.updateDeck}><h2>First</h2></DropDownItem>

                    {/* Put decks from db here */}
                    {decks.map(deck => (
                        <DropDownItem deckName={deck.deck_name} key={deck._id} action={props.updateDeck}><h2>{deck.deck_name}</h2></DropDownItem>
                    ))}
                    <DropDownItem leftIcon={<PlusIcon />}>
                        <InputItem>Create new Deck</InputItem>
                    </DropDownItem>
                </div>
            </CSSTransition>

        </div>
    )
}
