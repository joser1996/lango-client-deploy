import React from 'react'

export default function Header(props) {
    const language = props.language ? props.language : "None Specified";
    const headerStyle = {
        padding: "20px 0",
        lineHeight: "1.5em"
    };
    return (
        <header style={headerStyle}>
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: "600",
                    marginBottom: "2rem",
                    lineHeight: "1.5em",
                    color: "#B191D4",
                    textTransform: "lowercase",
                    textAlign: "center"
                }}>
                Learning: {language}
            </h1>
        </header>
    )
}
