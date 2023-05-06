import React from "react";
import styled from "@emotion/styled";



type Props  = {
    title: string,
    subTitle?: string,
    titleBottom?: boolean
}



const StyledH1 = styled.h1`
    font-size: var(--my-font-size-h1);
    color: var(--my-color-navy);
    margin-bottom: 0;
`
const StyledH2 = styled.h2`
    font-size: var(--my-font-size-h2);
    color: var(--my-color-navy);
    margin-bottom: 0;
`
const StyledP = styled.p`
    font-size: var(--my-font-size-smallP);
    color: var(--my-color-gray);
`


export function PageTitle(props: Props){

    const {title, subTitle} = props;

    return(
        <>
            <StyledH1>{title}</StyledH1>
            { subTitle && <StyledP>{subTitle}</StyledP> }
        </>
    )
}



export function ContentsTitle(props: Props){

    const {title, subTitle, titleBottom} = props;

    return(
        <div>
            { (subTitle && titleBottom) && <StyledP>{subTitle}</StyledP> }
            <StyledH2>{title}</StyledH2>
            { (subTitle && !titleBottom) && <StyledP>{subTitle}</StyledP> }
        </div>
    )
}