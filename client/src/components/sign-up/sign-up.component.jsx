import React from 'react'
import { Redirect } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
 
import './sign-up.styles.scss'

class SignUp extends React.Component{

    constructor()
    {
        super();

        this.state={
            displayName:'',
            email: '',
            password: '',
            confirmPassword:''
        };

    }
    
    handleSubmit=async(event)=>{
        event.preventDefault();

        if(this.state.password !== this.state.confirmPassword )
        {
            alert('passwords dont match');
        }
        
        else
        {
            const {displayName, email, password, confirmPassword} = this.state;
            
           // console.log(displayName);

            this.setState({displayName:'',
            email: '',
            password: '',
            confirmPassword:''});

            const res = await fetch('http://localhost:1337/api/signup',{
                method: 'post',
                
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    displayName, email, password
                })
            }).then((t)=>t.json())

             console.log(res);
            
             if(res.status==="err") {
                 window.alert(res.message);
             }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // fetch('http://localhost:1337/api/signup', requestOptions)
        //     .then(response => response.json());
        //     //.then(data => this.setState({ postId: data.id }));

              

        }

    }

    handleChange =(event)=>{
        const {value, name} = event.target;
      
       // console.log(event.target);
        this.setState({[name]: value})

       // console.log(this.state);

        
    }

    render(){
        const {displayName, email, password, confirmPassword}= this.state;
        return(
            <div className='sign-up'>
                <h1 className='title'>MAKE A NEW ACCOUNT!</h1>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                    label='display name'
                    name= 'displayName'
                    type= 'text'
                    value={this.state.displayName}
                    handleChange={this.handleChange}
                    required
                    />
                    
                    <FormInput
                    label='email'
                    name= 'email'
                    type='email'
                    value={email}
                    handleChange={this.handleChange}
                    required
                    />

                    <FormInput
                    label='password'
                    name= 'password'
                    type='password'
                    value={password}
                    handleChange={this.handleChange}
                    required
                    />

                    <FormInput
                    label='confirm password'
                    name= 'confirmPassword'
                    type='password'
                    value={confirmPassword}
                    handleChange={this.handleChange}
                    required
                    />
                    <CustomButton type='submit' >SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;