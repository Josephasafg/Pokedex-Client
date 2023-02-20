import React from "react";
import classes from "./Title.module.scss";

export const Title: React.FC = () => {
    return (
        <div className={classes.title}>
            <h1>My Pokédex</h1>
        </div>
    )
}