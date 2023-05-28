import React from 'react'
import { Spinner } from '../../styles/HeaderStyles'
import { Body, BoxEl } from '../../styles/RegisterStyle'

export const InfoLoadingSpinner = ({ size }) => {
    return (
        <Body>
            <BoxEl>
                <Spinner size={size} />
            </BoxEl>
        </Body>
    )
}
