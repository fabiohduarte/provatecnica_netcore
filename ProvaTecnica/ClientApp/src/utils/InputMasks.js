let _phoneMask = ["-", "(", ")"];
let _federalTaxIdMask = ["-"];
let _ssnMask = ["-"];
let _incomeMask = [","];
let _dateOfBirthMask = ["/"];

class InputMasks {
    static get phoneMask () { return _phoneMask; }
    static get incomeMask () { return _incomeMask; }
    static get federalTaxIdMask () { return _federalTaxIdMask; }
    static get ssnMask () { return _ssnMask; }
    static get dateOfBirthMask () { return _dateOfBirthMask; }
    
    static clearMask = (value, masks) => {
        let result = value;
        masks.forEach(mask => { result = result.split(mask).join(''); });

        return result;
    }
}

export default InputMasks;