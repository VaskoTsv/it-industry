import { BULGARIA_BOUNDS, SOFIA_CENTER_LOCATION } from './constants.js';

export function noop() {
}

export function debounce() {
    let timer;

    return (callback, ms) => {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}

export function newElement(type, attrs = {}) {
    const el = document.createElement(type);

    for (let attr in attrs) {
        const value = attrs[attr];
        if (attr == 'innerText') el.innerText = value;
        else el.setAttribute(attr, value);
    }

    return el;
}

// Custom error class that extends the default Error object and saves
// the error returned from the server, inside the custom Error.responseJSON property.
export class APIError extends Error {
    constructor(error) {
        super();
        this.responseJSON = error;
    }
}