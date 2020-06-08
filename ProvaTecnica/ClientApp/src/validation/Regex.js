
export const dot = () => { 
    return new RegExp(/(\.)+/gi);
};
export const space = () => { 
    return new RegExp(/([\s])+/gi);
};
export const hyphen = () => { 
    return new RegExp(/(-)+/gi);
};
export const apostrophe = () => { 
    return new RegExp(/(['`])+/gi);
};
export const quotationmark = () => { 
    return new RegExp(/(")+/gi);
};
export const comma = () => { 
    return new RegExp(/(,)+/gi);
};
export const at	= () => { 
    return new RegExp(/(@)+/gi);
};
export const hash = () => {
    return new RegExp(/(#)+/gi);
}; 
export const ampersand = () => { 
    return new RegExp(/(&)+/gi);
};
export const parenthesis = () => { 
    return new RegExp(/([()])+/gi);
};
export const underline = () => { 
    return new RegExp(/(_)+/gi);
};	
export const semicolon = () => { 
    return new RegExp(/(;)+/gi);
};
export const colon = () => { 
    return new RegExp(/(:)+/gi);
};
export const slash = () => { 
    return new RegExp(/(\/)+/gi);
};
export const asterisk = () => { 
    return new RegExp(/(\*)+/gi);
};
export const numeric = () => { 
    return new RegExp(/[\d]+/gi);
};
export const alpha = () => { 
    return new RegExp(/[a-z]+/gi);
};
export const alphaNumeric = () => { 
    return new RegExp(/[a-z\d]+/gi);
};
export const remainingSpecialChars = () => { 
    return new RegExp(/[^\d\w\s.\-`",@#&();:/'*]+/gi);
};
