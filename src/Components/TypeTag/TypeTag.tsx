import React from "react";
import styled from "styled-components";
import classes from "./TypeTag.module.scss";

const DarkText = "#212121";
const LightText = "#fff";

const getBackgroundColor = (colorType: string) => {
    switch (colorType) {
        case "Bug":
            return `background-color: #729f3f; color: ${LightText}`;
        case "Dragon":
            return `background-color: #53a4cf; background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%); color: ${LightText}`;
        case "Electric":
            return `background-color: #eed535; color: ${DarkText}`;
        case "Fighting":
            return `background-color: #d56723; color: ${LightText}`;
        case "Fairy":
            return `background-color: #fdb9e9; background: linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%); color: ${DarkText}`;
        case "Fire":
            return `background-color: #fd7d24; color: ${LightText}`;
        case "Ghost":
            return `background-color: #7b62a3; color: ${LightText}`;
        case "Normal":
            return `background-color: #a4acaf; color: ${DarkText}`;
        case "Ground":
            return `background-color: #f7de3f; background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%); color: ${DarkText}`;
        case "Psychic":
            return `background-color: #f366b9; color: ${LightText}`;
        case "Dark":
            return `background-color: #707070; color: ${LightText}`;
        case "Steel":
            return `background-color: #9eb7b8; color: ${DarkText}`;
        case "Flying":
            return `background-color: #3dc7ef; background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%); color: ${DarkText}`;
        case "Grass":
            return `background-color: #9bcc50; color: ${DarkText}`;
        case "Ice":
            return `background-color: #51c4e7; color: ${DarkText}`;
        case "Poison":
            return `background-color: #b97fc9; color: ${LightText}`;
        case "Rock":
            return `background-color: #a38c21; color: ${LightText}`;
        case "Water":
            return `background-color: #4592c4; color: ${LightText}`;
    }
}

const Tag = styled.span<{
    pokeType: string;
}>`
  font-family: "Flexo-Medium",arial,sans-serif;
  border-radius: 3px;
  line-height: 18px;
  max-width: 110px;
  margin: 0 1.5625% 0 0;
  width: 28%;
  float: left;
  text-transform: none;
  font-size: 11px;
  text-align: center;
  
  ${({ pokeType }) => getBackgroundColor(pokeType)}
`;


interface TypeTagProps {
    pokeType: string
}

export const TypeTag: React.FC<TypeTagProps> = (
    {
        pokeType,
    }) => {
    return (
        <span className={classes.tagContainer}>
            <Tag pokeType={pokeType}>
                {pokeType}
            </Tag>
        </span>

    )
}