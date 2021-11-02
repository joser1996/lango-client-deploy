import React, { useState } from 'react'

export default function NavItem(props) {
    const [open, setOpen] = useState(false);

    const desc = props.desc

    function DropItem() {
        return(
            <a
                href="#"
                className="icon-button"
                title={desc}
                onClick={() => setOpen(!open)}
                >
                {props.icon}
            </a>
        )
    }

    function ActionItem() {
        return(
            <a
                href="#"
                className="icon-button"
                title={desc}
                onClick={props.action}
                >
                {props.icon}
            </a>
        )
    }

    return (
        <li className="nav-item">
            {props.drop ? <DropItem /> : <ActionItem />}

            {open && props.children}
        </li>
    )
}
