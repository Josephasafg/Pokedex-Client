import React, {ChangeEvent} from "react";
import Pagination from "@mui/material/Pagination";
import {PageInfo} from "../../Models/PageInfo";
import styled from "styled-components";

interface PageControlProps {
    pageInfo: PageInfo
    onChange: (event: ChangeEvent<unknown>, value: number) => void
}


const PaginationWrapper = styled.div`
  margin: 20px;
`

export const FooterPageControl: React.FC<PageControlProps> = (
    {
        pageInfo,
        onChange
    }) => {
    return (
        <PaginationWrapper>
            <Pagination count={Math.ceil(pageInfo.total / pageInfo.size)}
                        page={pageInfo.page}
                        onChange={onChange}
                        variant={"outlined"}
                        color={"primary"}/>
        </PaginationWrapper>
    )
}