import React from "react";
import styled from '@emotion/styled';



export default function Logo() {

    const StyledDiv = styled.div`
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: center;

        .icon{
            border-radius: var(--my-border-radius-circle);
            padding: var(--my-padding-s);
            margin-right: var(--my-margin-xs);
            background: linear-gradient(-20deg, var(--my-color-pink) 0%, var(--my-color-purple) 100%);
            color: var(--my-color-white);
            height: var(--my-size-header-logo);
            width: var(--my-size-header-logo);
            font-size: var(--my-font-size-h2);
            font-weight: bold;
        }
        p {
            font-size: var(--my-font-size-h2);
            font-weight: bold;
            color: var(--my-color-navy);
            letter-spacing: 0px;
        }
    `

    return (
        <StyledDiv>
            <div className="icon">BM</div>
            <p>BalanceMan</p>
        </StyledDiv>
    )
}