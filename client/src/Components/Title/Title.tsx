import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 1em;
  margin-bottom: 2em;
  background-color: #313131;
  color: #fff;
`;
export const Title: React.FC = () => {
    return (
        <TitleWrapper>
            <h1>My Pokédex</h1>
        </TitleWrapper>
    )
}