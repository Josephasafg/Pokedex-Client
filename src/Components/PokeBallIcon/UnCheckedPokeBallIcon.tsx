import {Icon} from "@mui/material";
import React from "react";

const UNCHECKED_ICON = require("../../Resources/Icons/unchecked_pokeball.ico");

export const UnCheckedPokeBallIcon: React.FC = () => {
    return (
        <Icon>
            <img src={UNCHECKED_ICON} height={20} width={20}/>
        </Icon>
    )
}