import {Icon} from "@mui/material";
import React from "react";

const CHECKED_ICON = require("../../Resources/Icons/checked_pokeball.ico");


export const CheckedPokeBallIcon: React.FC = () => {
    return (
        <Icon>
            <img src={CHECKED_ICON} height={20} width={20}/>
        </Icon>
    )
}