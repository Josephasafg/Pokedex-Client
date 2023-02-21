import {Icon as MIcon} from "@mui/material";
import React from "react";

const SNORLAX_ICON = require("../../Resources/Icons/avatar.ico");
const PSYDUCK_ICON = require("../../Resources/Icons/psyduck.ico");
const CHECKED_ICON = require("../../Resources/Icons/checked_pokeball.ico");
const UNCHECKED_ICON = require("../../Resources/Icons/unchecked_pokeball.ico");

interface IconsProps {
    src: string
    alt: string
}


const Icon: React.FC<IconsProps> = ({src, alt}) => {
    return (
        <MIcon>
            <img src={src} height={20} width={20} alt={alt}/>
        </MIcon>
    )
}

export const SnorlaxIcon = <Icon src={SNORLAX_ICON} alt={"snorlax-icon"}/>;
export const PsyduckIcon = <Icon src={PSYDUCK_ICON} alt={"psyduck-icon"}/>;
export const CheckedPokeBallIcon = <Icon src={CHECKED_ICON} alt={"checked-icon"}/>;
export const UnCheckedPokeBallIcon = <Icon src={UNCHECKED_ICON} alt={"unchecked-icon"}/>;

