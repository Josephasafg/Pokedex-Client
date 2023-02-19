import React, {ChangeEvent} from "react";
import Pagination from "@mui/material/Pagination";
import {PageInfo} from "../../Models/PageInfo";

interface PageControlProps {
    pageInfo: PageInfo
    onChange: (event: ChangeEvent<unknown>, value: number) => void
}

export const FooterPageControl: React.FC<PageControlProps> = (
    {
        pageInfo,
        onChange
    }) => {
    return (
        <div style={{margin: "20px"}}>
            <Pagination count={Math.ceil(pageInfo.total / pageInfo.size)}
                        page={pageInfo.page}
                        onChange={onChange}
                        variant={"outlined"}
                        color={"primary"}/>
        </div>
    )
}