import React, { useState } from 'react'
import { CSSTransition } from "react-transition-group";

export default function DropDownMenu() {
    const [activeMenu, setactiveMenu] = useState('main');

    function DropDownItem(props) {
        return(
            <a href="#" className="menu-item" >
                {props.children}
            </a>
        );
    }

    return (
        <div className="dropdown">
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
            >
                <div className="menu">
                    <DropDownItem>Change Language</DropDownItem>
                    <DropDownItem>Change Deck</DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}
