import React, { useRef, useState, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg'

export default function DropDownMenu() {
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
        return(
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setactiveMenu(props.goToMenu)}>
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
                    <DropDownItem>Japanese</DropDownItem>
                    <DropDownItem>Korean</DropDownItem>
                    <DropDownItem>Italian</DropDownItem>
                    <DropDownItem>French</DropDownItem>
                    <DropDownItem>Spanish</DropDownItem>
                    <DropDownItem>German</DropDownItem>
                    <DropDownItem>Mandarin</DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}
