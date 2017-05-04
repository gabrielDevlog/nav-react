import React, {PropTypes} from 'react';
import {ScrollView} from 'react-native';

// COMPONENT : form manager component
class FormManager extends React.Component {

    constructor(props){
        super(props);

        // array to follow inputsValidity
        const validInputs = new Array(this.props.children.length).fill(false);

        // if an input as no validation rules, we consider it valid
        this.props.children.map( (child, index) => {

            if( !child.props.min && !child.props.regexp ) {
                validInputs[index] = true;
            }
        });

        // set state
        this.state = {
            validInputs: validInputs,
            isFormValid: false,
        };

        // bind method to this
        this.getValidationHandler = this.getValidationHandler.bind(this);
        this.getHandleSubmit = this.getHandleSubmit.bind(this);
    }

    // currying for validation handler
    getValidationHandler(index){

        return bool => {

            // table of input validation
            const validInputs = this.state.validInputs;

            // update the index
            validInputs[index] = bool;

            // is the form valid ?
            const isFormValid = validInputs.every( val => val);

            // update state
            this.setState({
                validInputs: validInputs,
                isFormValid: isFormValid
            });
        }
    }

    // handle submit
    getHandleSubmit(){

        // object with all named input values
        let inputValues= {};
        /*
        this.props.children.map( (child, index) => {
            ch
        });
        */
    }

    render(){

        // add some properties to children InputManager
        const childrenWithProps = React.Children.map(this.props.children, (child, index) => {

            // we manage only on InputManager child
            if( child.type.name !== 'InputManager') {
                return child;
            }

            // object of new properties
            const newProps = {};

            // add an indexed validation handler
            newProps.validationHandler = this.getValidationHandler(index);

            // enable/disable component waiting for a form validation
            if( child.props.disabledIfFormInvalid) {
                newProps.disabled = !this.state.isFormValid;
            }

            // clone the component & merge with new props
            return React.cloneElement(child, newProps);
        });

        /*
         <form onSubmit={this.props.onSubmit}>
         {childrenWithProps}
         </form>
         */
        return(

            <ScrollView>
                {childrenWithProps}
            </ScrollView>
        );
    }
}

// Required properties
FormManager.propTypes = {

    /*
    // this component only accept InputManager components as children
    children: (props) => {

        let valid = props.children.every(child => {
            return child.type.name !== 'undefined' && child.type.name === 'InputManager'
        });

        if( !valid) {
            return new Error('FormManager only expects InputManager component as children');
        }
    },
    */
    // submit method, required
    //onSubmit: PropTypes.func.isRequired,
};

// Default properties
FormManager.defaultProps = {
};

// export
export default FormManager;
