import React from 'react';
import { Button, ControlGroup, Divider, Tooltip, Position } from '@blueprintjs/core';
import {
    __FiltersContainer,
    __FiltersItem,
} from './styles/filter.js';

export default function Filters({onClear, hideClearButton, title, children}) {
    const renderClearFilters = () => {
        return (
            <Tooltip content="Clear all filters" position={Position.RIGHT}>
                <Button icon="eraser" onClick={onClear}>
                    Clear
                </Button>
            </Tooltip>
        );
    }

    return (
        <__FiltersContainer>
            <header>
                <h2 className="bp3-heading">{title || 'Filters'}</h2>
                {!hideClearButton && renderClearFilters()}
            </header>
            <Divider />
            <main>
                <ControlGroup vertical={false}>{children}</ControlGroup>
            </main>
        </__FiltersContainer>
    );
}

Filters.Item = function FiltersItem({label, children}) {
    return (
        <__FiltersItem>
            {label && <span>{label}: </span>}
            {children}
        </__FiltersItem>
    );
}
