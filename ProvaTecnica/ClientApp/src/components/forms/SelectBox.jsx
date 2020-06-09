import React from "react";

import "./SelectBox.css";

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        if (props.onInputRefSet) {
            props.onInputRefSet(this.inputRef);
        }
    }

    render() {
        const {
            id,
            displayName,
            value,
            tabIndex,
            disabled,
            options = [],
            errorMessage,     
            onChangeCallback = () => false,
            onBlurCallback = () => false,
            className
        } = this.props;

       
        return (
            <div className={`select-box form-group ${errorMessage && "invalid"} `}>
                <label htmlFor={id}>{displayName}</label>
                
                <select
                    ref={this.inputRef}
                    className={`form-control ${className}`}
                    id={id}
                    tabIndex={tabIndex}
                    value={value}
                    onChange={onChangeCallback}
                    onBlur={onBlurCallback}
                    disabled={disabled}>
                    {
                        options.map(
                            option => <option key={option.value} value={option.value}>{option.text}</option>
                        )
                    }
                </select>           
                {
                    errorMessage &&
                    <div className="error-message">
                        {errorMessage}
                    </div>
                }
               
            </div>
        );
    }
}