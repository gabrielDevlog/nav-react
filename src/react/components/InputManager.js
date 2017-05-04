import React, {PropTypes} from 'react';
import {View, TextInput, Text, Button} from 'react-native';

// COMPONENT : Input manager : manage <input > with validation message
class InputManager extends React.Component {

    constructor(props){
        super(props);

        // state: control field value & error message
        this.state= {
            inputValue: this.props.value,
            isInputValid: false,
            isInputDirty: false,
            showError: false
        };

        // bind methods to this
        this.valid = this.valid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    // validation method
    valid(inputValue) {

        // min length rule
        if( this.props.min) {
            return this.props.min < inputValue.length;
        }

        // regexp rule
        if(this.props.regexp) {
            return this.props.regexp.test(inputValue);
        }

        return true;
    }

    // handle text change
    handleChange(text){

        // check validity
        const valid = this.valid(text);

        // do we show error ?
        let showError = this.state.showError;
        if( this.props.errorEvent == 'onChange') {
            showError = true;
        }
        else if( this.props.errorEvent == 'onBlur' && this.state.isInputDirty) {
            showError = true;
        }

        // update state
        this.setState({
            inputValue: text,
            isInputValid: valid,
            showError: showError,
        });

        // transmit if the input is valid to the above component
        if(this.props.validationHandler) {
            this.props.validationHandler(valid);
        }

        // transmit the input value to the above component
        if(this.props.bindValue){
            this.props.bindValue(text);
        }
    }

    // handle onBlur event
    handleBlur(event){

        // do we show error ?
        let showError = this.state.showError;
        if( this.props.errorEvent == 'onBlur') {
            showError = true;
        }

        // update state
        this.setState({
            isInputDirty: true,
            showError: showError,
        });
    }

    // render the error message
    renderError(){
        if( !this.state.isInputValid &&
            this.state.showError &&
            this.props.errorMsg.length > 0) {
            return <Text>{ this.props.errorMsg}</Text>
        }

        return null;
    }

    // render the input
    renderInput(){

        switch(this.props.type){
            case 'submit':
                return (
                    <Button
                        title={this.props.value}
                        onPress={this.props.onPress}
                        style={this.props.style}
                    />
                );

            case 'password':
                return(
                    <TextInput
                        type={this.props.type}
                        value={this.state.inputValue}
                        onChangeText={this.handleChange}
                        onBlur={this.handleBlur}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        style={this.props.style}
                        secureTextEntry={true}
                    />
                );

            case 'text':
            default:
                return(
                    <TextInput
                        type={this.props.type}
                        value={this.state.inputValue}
                        onChangeText={this.handleChange}
                        onBlur={this.handleBlur}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        style={this.props.style}
                    />
                );
        }
    }

    render(){
        return(
            <View>

                {/* Input */}
                { this.renderInput() }

                {/* validation message */}
                { this.renderError() }
            </View>
        );
    }
}

// required/optionnal properties
InputManager.propTypes = {

    // input type , optionnal
    type: PropTypes.oneOf(['text', 'password', 'number', 'submit']),

    // name, required
    name: PropTypes.string.isRequired,

    // input value, optionnal
    value: PropTypes.oneOfType([ PropTypes.string,PropTypes.number]),

    // error message if input invalid, optionnal
    errorMsg: PropTypes.string,

    // when does error message appear, optionnal
    errorEvent: PropTypes.oneOf(['onBlur', 'onChange']),

    // disabled state, html 5
    disabled: PropTypes.bool,

    // tell the formManager to disable this input if the form is not valid
    disabledIfFormInvalid: PropTypes.bool,

    // a function to transmit if the input value is valid or not, must accept a boolean, optionnal
    validationHandler: (props, propName) => {
        const fn = props[propName];

        if( !fn) {
            return;
        }

        if( typeof fn !== 'function') {
            return new Error('ValidationHandler should be a function waiting for a boolean value');
        }

        if( fn.length !== 1){
            return new Error('ValidationHandler should expect 1 parameter which should be a boolean');
        }
    },

    // input name : optionnal,
    name: PropTypes.string,

    // min length of input value
    min: PropTypes.number,

    // regexp that the input should match, optionnal
    regexp: (props, propName) => {

        if( !props[propName]) {
            return;
        }

        if( props[propName] instanceof RegExp === false) {
            return new Error('regexp property expects a regexp object');
        }

    },

    // bind the input value to the above component
    bindValue: (props, propName) => {
        const fn = props[propName];

        if( !fn) {
            return;
        }

        if( typeof fn !== 'function') {
            return new Error('bindValue should be a function waiting for a string value');
        }
    },
};

// default properties values
InputManager.defaultProps  = {
    type: 'text',
    errorMsg: '',
    errorEvent: 'onChange',
    value:'',
    disabled: false
};

export default InputManager;