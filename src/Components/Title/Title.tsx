import React from "react";
import classes from "./Title.module.scss";

export const Title: React.FC = () => {
    return (
        <div className={classes.title}>
            <h1>Your Journey Begins Now!</h1>

            <h4 className={classes.subtitle}>Your very own Pokedex</h4>
        </div>
    )
}