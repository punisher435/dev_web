import React, { Component } from 'react'
import SellerForm from './SellerForm'


export class Sforms extends Component {
    state={
        step:1,
        name:'',
        email:'',
        mobile:'',
        aadhar:'',
        alternate_mobile:''
    }
nextStep = () => {
    const { step } = this.state;
    this.setState({
        step: step + 1
    });
}
prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    });
}

handleChange = input => e => {
    this.setState({[input]: e.target.value});
}

    render() {
        const { step } =  this.state;
        const{ name, email, mobile, aadhar, alternate_mobile} = this.state;
        const values = {name, email, mobile, aadhar, alternate_mobile}
        
        switch(step){
            case 1:
                return (
                    <SellerForm
                    nextStep = {this.nextStep}
                    handleChange = {this.handleChange}
                    values = {values}
                    />
                );
                case 2:
                    return <h1>SellerPayment</h1>;
                case 3:
                    return <h1>SellerAddress</h1>;
    }
  }
}

export default Sforms;
