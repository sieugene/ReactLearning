
export const required = (value) => {
    if(value) return undefined;
    return 'Some errors';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return 'Maximum number of characters ' + maxLength;
    return undefined
}
