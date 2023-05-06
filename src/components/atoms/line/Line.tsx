import React from 'react';
import styled from '@emotion/styled';

type Props = {
    margin: string,    // css変数（space）
    dark?: boolean 
}

export default function Line(props: Props) {
    const {margin, dark} = props;

    const StyledHr = styled.hr`
        color: ${dark ? '': ''};
        width: 100%;
        margin: var(${margin}) 0;
        box-sizing: border-box;
    `

    return(
        <div>
            <StyledHr />
        </div>
    )
}