import React, { useState } from 'react'

export default function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a
                href="#"
                className="icon-button"
                title={props.desc} 
                onClick={props.drop ? () => setOpen(!open) : undefined}
                onClick={!props.drop ? props.action : undefined}
                >
                {props.icon}
            </a>

            {open && props.children}
        </li>
    )
}
