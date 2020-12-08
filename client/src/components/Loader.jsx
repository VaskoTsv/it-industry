import React from 'react';
import { __Loader } from './styles/loader.js';
import { Intent, Spinner } from '@blueprintjs/core';

export default function Loader({isLoading}) {
    if (!isLoading) {
        return null;
    }

    return (
        <__Loader>
            <Spinner intent={Intent.WARNING} size={Spinner.SIZE_LARGE} />
        </__Loader>
    );
}
