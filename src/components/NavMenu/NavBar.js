import React from 'react'

export default function NavBar(props) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>Lango!</h1>
                <h1>Deck: {props.deck}</h1>
            </div>

            <ul className="navbar-nav">
                { props.children }
            </ul>
        </nav>
    )
}
