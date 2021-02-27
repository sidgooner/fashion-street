import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import {setCurrentUser} from '../../redux/user/user-actions'
import './sign-in.styles.scss'

class SignIn extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            email: '',
            password: ''
        };
    }

    handleSubmit= async(event)=>{
        event.preventDefault();
        
        console.log('clicked');

        const email= this.state.email;

        const password= this.state.password;

        this.setState({email: '', password:''});

       const res= await fetch('http://localhost:1337/api/signin',{
            method: 'POST',
            
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token") || ''
            }
        }).then((t)=>t.json())

        if(res.status === 'ok')
        {
            localStorage.setItem("token", res.token);
            localStorage.setItem("displayName", res.user.displayName);
            localStorage.setItem("email", res.user.email);
            const currentUser={
                token: res.token,
                displayName: res.user.displayName,
                email: res.user.email
            };

            this.props.setCurrentUser(currentUser);
            alert("You logged in");
        }
        else{
            window.alert("wrong credentials");
        }

    };

    handleChange=(event)=>{
        const {value, name} = event.target;
      //csadsda  console.log(event.target);

        this.setState({[name]: value})
    }


    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    type="email" 
                    name='email' 
                    value={this.state.email}
                    handleChange={this.handleChange} 
                    label='email'
                    required/>
                    
                    <FormInput 
                    type="password" 
                    name='password'
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label='password'
                    required/>
                    
                    <CustomButton type='submit' >SIGN IN</CustomButton>
                </form>
            </div>
        );
    }


}

const mapDispatchToProps= (dispatch)=>({
    setCurrentUser: user=> dispatch(setCurrentUser(user))
  });

export default connect(null, mapDispatchToProps)(SignIn);