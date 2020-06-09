import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';

import './InputBox.css';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    if (props.onInputRefSet) {
      props.onInputRefSet(this.inputRef);
    }
  }

  handleOnPaste = (e) => {
    if (this.props.disablePaste) {
      e.preventDefault();
      return;
    }
  }

  handleOnChange = (e) => {
    let content = e.target.value;

  ///  if (this.props.allowedRules && content && content.length)
   ///   content = DFSUIValidation.removeInvalidCharacters(content, this.props.allowedRules);

    ///content = content.substring(0, this.props.maxLength);

    if (this.props.onChangeCallback)
  this.props.onChangeCallback(content);
  }

  handleOnKeypress = (e) => {
    //i//f (this.props.allowedRules) {
    ///  const key = e.key.length === 1 ? e.key : String.fromCharCode(e.charCode);

     // if (!DFSUIValidation.validateCharacter(key, this.props.allowedRules)) {
     ///   e.preventDefault();
    //    return;
     /// }
    ///}

    if (this.props.onKeyPressCallback)
      this.props.onKeyPressCallback(e);
  }

  render() {
    const {
      type, id, maxLength, value, placeholder, className,
      displayName,
      onBlurCallback,
      errorMessage,
      disabled,
      hint
    } = this.props;

   

    const commonInputProps = {
      type,
      value,
      name: id,
      id,
      maxLength,
      className: `${className} ${errorMessage ? "is-invalid" : ""}`,
      placeholder,
      onChange: this.handleOnChange,
      onBlur: onBlurCallback,
      disabled,
      innerRef: this.inputRef
    };

    return (
      <FormGroup className={`input-box ${errorMessage ? "invalid" : ""} `}>
        <Label htmlFor={id}>{displayName}</Label>
        <div>
          {          
              <Input
                {...commonInputProps}
                onKeyPress={this.handleOnKeypress}
                onPaste={this.handleOnPaste}
              />
          }         
        </div>
        {
          errorMessage &&
          <div id={`feedback_${id}`} className="error-message">
            {errorMessage}
          </div>
        }
        {
          hint &&
          <div id={`feedback_${id}`} className="hint-message">
            {hint}
          </div>
        }
      </FormGroup>
    )
  }
}