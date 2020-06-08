import validator from 'validator';
import InputMasks from "../utils/InputMasks";
import * as Regex from "./Regex";

class FormValidator {
    constructor(validations) {
        // validations is an array of validation rules specific to a form
        this.validations = validations;
        this.submitted = false
    }

    validate(state) {
        // start out assuming valid
        let validation = this.valid();

        // for each validation rule
        this.validations.forEach(rule => {

            // if the field hasn't already been marked invalid by an earlier rule
            if (!validation[rule.field].isInvalid) {
                // determine the field value, the method to invoke and optional args from 
                // the rule definition
                let field_value = "";
               
                if(state[rule.field] !== undefined)
                     field_value = state[rule.field];

                if(state.customerData && state.customerData[rule.field])
                    field_value = state.customerData[rule.field].toString();
                else if(state.businessInformation && state.businessInformation[rule.field])
                    field_value = state.businessInformation[rule.field].toString();
                else if(state.contactInformation && state.contactInformation[rule.field])
                    field_value = state.contactInformation[rule.field].toString();
                else if(state.physicalAddress && state.physicalAddress[rule.field])
                    field_value = state.physicalAddress[rule.field].toString();
                else if(state.yourInformation && state.yourInformation[rule.field])
                    field_value = state.yourInformation[rule.field].toString();

                if(rule.masks)
                {
                    field_value = InputMasks.clearMask(field_value, rule.masks);
                } 
                const args = rule.args || [];
                const validation_method =
                    typeof rule.method === 'string' ?
                        validator[rule.method] :
                        rule.method

                // call the validation_method with the current field value as the first
                // argument, any additional arguments, and the whole state as a final
                // argument.  If the result doesn't match the rule.validWhen property,
                // then modify the validation object for the field and set the isValid
                // field to false
                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    validation[rule.field] = { isInvalid: true, message: rule.message }
                    validation.isValid = false;
                }
            }
        });

        return validation;
    }

    validateOnBlur(state, validationState, fieldName, formSection) {
        //alert(`invalid: ${validationState[fieldName].isInvalid} touched: ${validationState[fieldName].touched}`);
        validationState[fieldName].touched = true;

        validationState[fieldName].isInvalid = false;
        // for each validation rule of that field
        this.validations.filter((elem) => elem.field === fieldName).forEach(rule => {

            // if the field hasn't already been marked invalid by an earlier rule
            if (!validationState[rule.field].isInvalid) {
                // determine the field value, the method to invoke and optional args from 
                // the rule definition

                let field_value;
                if(formSection)
                {
                    field_value = state[formSection][rule.field] ? state[formSection][rule.field].toString() : "";
                }
                else
                {
                    field_value = state[rule.field] ? state[rule.field].toString() : "";
                }                

                if(rule.masks)
                {
                    field_value = InputMasks.clearMask(field_value, rule.masks);
                } 
                
                const args = rule.args || [];
                const validation_method =
                    typeof rule.method === 'string' ?
                        validator[rule.method] :
                        rule.method

                // call the validation_method with the current field value as the first
                // argument, any additional arguments, and the whole state as a final
                // argument. 
                
                // console.log(`state: ${JSON.stringify(state, null, 4)}!`);
                // console.log(`customerdata: ${JSON.stringify(state[formSection], null, 4)}!`);
                // console.log(`value: ${state[formSection][rule.field].toString()}!`);

                const isInvalid = validation_method(field_value, ...args, state) !== rule.validWhen;
                validationState[rule.field] = { 
                    isInvalid: isInvalid, 
                    message: isInvalid && rule.message, 
                    touched: true 
                };
                if (isInvalid)
                    validationState.isValid = false;
            }
        });
        return validationState;
    }

    valid() {
        const validation = {}

        this.validations.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '', touched: false }
        ));

        return { isValid: true, ...validation };
    }

    getValidationClass(fieldName, validationState) {
        let validationEntry = validationState[fieldName];
        if (validationEntry) {
            if ((this.submitted || validationEntry.touched) && validationEntry.isInvalid) {
                return "is-invalid";
            }
        }
        if(fieldName.indexOf('idType') > -1){
            return "";
        }
        return "form-control";
    }

    wasSubmitted() {
        return this.submitted;
    }

    formSubmitted() {
        this.submitted = true;
    }

    handleInputKeyPress(event, allowedRules) {

        let accepted = false;
        allowedRules.forEach(rule => {
            switch (rule) {
                case "alphanumeric":
                    if (!accepted) {
                        if (Regex.alphaNumeric().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "alpha":
                    if (!accepted) {
                        if (Regex.alpha().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "numeric":
                    if (!accepted) {
                        if (Regex.numeric().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "space":
                    if (!accepted) {
                        if (Regex.space().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "hyphen":
                    if (!accepted) {
                        if (Regex.hyphen().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "apostrophe":
                    if (!accepted) {
                        if (Regex.apostrophe().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "quotationmark":
                    if (!accepted) {
                        if (Regex.quotationmark().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "dot":
                    if (!accepted) {
                        if (Regex.dot().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "comma":
                    if (!accepted) {
                        if (Regex.comma().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "at":
                    if (!accepted) {
                        if (Regex.at().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "hash":
                    if (!accepted) {
                        if (Regex.hash().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "ampersand":
                    if (!accepted) {
                        if (Regex.ampersand().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "parentheses":
                    if (!accepted) {
                        if (Regex.parenthesis().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "underline":
                    if (!accepted) {
                        if (Regex.underline().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "semicolon":
                    if (!accepted) {
                        if (Regex.semicolon().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "colon":
                    if (!accepted) {
                        if (Regex.colon().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "slash":
                    if (!accepted) {
                        if (Regex.slash().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                case "asterisk":
                    if (!accepted) {
                        if (Regex.asterisk().test(event.key)) {
                            accepted = true;
                        }
                    }
                    break;
                default:
                    accepted = true;
            }
        })
        
        if (event.key === "Subtract" && allowedRules.indexOf("hyphen") === -1)
        {
            accepted = false;
        }
        if (event.key === "Delete" && allowedRules.indexOf("comma") === -1)
        {
            accepted = false;
        }
        if (event.key === "Multiply" && allowedRules.indexOf("asterisk") === -1)
        {
            accepted = false;
        }
        if (event.key === "Divide" && allowedRules.indexOf("slash") === -1)
        {
            accepted = false;
        }
        if (event.key === "Add" && allowedRules.length > 0)
        {
            accepted = false;
        }

        if (!accepted) {
            event.preventDefault();
        }
    }

    handleOnPaste(event, allowedRules, maxLength) {
        
        let pastedValue;
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        if(isIE)
        {
            pastedValue = event.clipboardData.getData("Text");
        }
        else
        {
            pastedValue = event.clipboardData.getData('text/plain');
        }

        if(allowedRules.indexOf("dot") === -1)
            pastedValue = pastedValue.replace(Regex.dot(),'');
        if(allowedRules.indexOf("space") === -1)
            pastedValue = pastedValue.replace(Regex.space(),'');
        if(allowedRules.indexOf("hyphen") === -1)
            pastedValue = pastedValue.replace(Regex.hyphen(),'');
        if(allowedRules.indexOf("apostrophe") === -1)
             pastedValue = pastedValue.replace(Regex.apostrophe(),'');
        if(allowedRules.indexOf("quotationmark") === -1)
            pastedValue = pastedValue.replace(Regex.quotationmark(),'');
        if(allowedRules.indexOf("comma") === -1)
            pastedValue = pastedValue.replace(Regex.comma(),'');
        if(allowedRules.indexOf("at") === -1)
            pastedValue = pastedValue.replace(Regex.at(),'');
        if(allowedRules.indexOf("hash") === -1)
            pastedValue = pastedValue.replace(Regex.hash(),'');
        if(allowedRules.indexOf("ampersand") === -1)
            pastedValue = pastedValue.replace(Regex.ampersand(),'');
        if(allowedRules.indexOf("parenthesis") === -1)
            pastedValue = pastedValue.replace(Regex.parenthesis(),'');
        if(allowedRules.indexOf("underline") === -1)
            pastedValue = pastedValue.replace(Regex.underline(),'');
        if(allowedRules.indexOf("semicolon") === -1)
            pastedValue = pastedValue.replace(Regex.semicolon(),'');
        if(allowedRules.indexOf("colon") === -1)
            pastedValue = pastedValue.replace(Regex.colon(),'');
        if(allowedRules.indexOf("slash") === -1)
            pastedValue = pastedValue.replace(Regex.slash(),'');
        if(allowedRules.indexOf("asterisk") === -1)
            pastedValue = pastedValue.replace(Regex.asterisk(),'');
        if(allowedRules.indexOf("numeric") === -1 && allowedRules.indexOf("alphanumeric") === -1)
            pastedValue = pastedValue.replace(Regex.numeric(),'');
        if(allowedRules.indexOf("alpha") === -1 && allowedRules.indexOf("alphanumeric") === -1)
            pastedValue = pastedValue.replace(Regex.alpha(),'');

        //removes all characters not included in the conditionals above and limits pasted value length as per field's 
        pastedValue = pastedValue.replace(Regex.remainingSpecialChars(),"");
        pastedValue = pastedValue.substring(0, maxLength);

        return pastedValue; 
    }
}

export default FormValidator;