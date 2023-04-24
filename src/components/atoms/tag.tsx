import React from "react";
import styled from "@emotion/styled";

type Props = {
    text: string,
    bgColor: string,
    small?: boolean,
    large?: boolean,
}

export default function Tag(props:Props) {
    const {text, bgColor, small, large} = props;

    const StyledSpan = styled.span`
        background-color: var(${bgColor});
        color: var(--my-color-white);
        padding:${small ? 'var(--my-padding-xs) var(--my-padding-s)' : large ? 'var(--my-padding-m) var(--my-padding-l)' : 'var(--my-padding-s) var(--my-padding-m)'};
        font-size: var(--my-font-size-smallP) !important;
        font-weight: bold;
        border-radius: var(--my-border-radius-rounded);
    `

    return(
        <StyledSpan>
            {text}
        </StyledSpan>
    )
}