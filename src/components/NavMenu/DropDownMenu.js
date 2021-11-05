import React, { useRef, useState, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg'

export default function DropDownMenu(props) {
    const [activeMenu, setactiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

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
        }

        return(
            <a href="#" className="menu-item" onClick={handleClick}>
                {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> :undefined}
                {props.children}
                {props.rightIcon ? <span className="icon-right">{props.rightIcon}</span> : undefined}
            </a>
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
                    <DropDownItem>Change Deck</DropDownItem>
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
        </div>
    )
}
