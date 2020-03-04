/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';

export const Login = (props) => {

    let [form, setForm] = useState('login');
    let [api, setApi] = useState('');
    let [userLogin, setUserLogin] = useState({username: '', password: ''});
    let [userSignUp, setUserSignUp] = useState({username: '', email: '', password: ''}); 

    let URL = 'https://pintereach1.herokuapp.com/api/';

useEffect(() => {
    switch(api) {
        case 'login':
            axios.post(URL+api, userLogin)
            .then(res => {
                console.log(res);
                window.localStorage.setItem('pintereachAuth', res.data.token);
                window.localStorage.setItem('pintereachUser', res.data.user.username);
                props.setLoggedIn(true);
                props.history.push('/dashboard');
                props.history.go();
            })
            .catch(err => {
                console.log(err);
            });
        break;

        case 'register':
            axios.post(URL+api, userSignUp)
            .then(res => {
                console.log(res);
                window.localStorage.setItem('pintereachAuth', res.data.token);
                window.localStorage.setItem('pintereachUser', res.data.user.username);
                props.setLoggedIn(true);
                props.history.push('/dashboard');
                props.history.go();
            })
            .catch(err => {
                console.log(err);
            });
        break;
    }

},[api]);

    let handleRegister = (e) => {
        e.preventDefault();
        setApi('register')
    }
    let handleSignIn = (e) => {
        e.preventDefault();
        setApi('login');
    }

   let updateLoginUsername = (e) => {
        setUserLogin({username: e.target.value, password: userLogin.password})
    }
    let updateLoginPassword = (e) => {
        setUserLogin({username: userLogin.username, password: e.target.value})
    }


    let updateSignupUsername = (e) => {
        setUserSignUp({username: e.target.value, email: userSignUp.email, password: userSignUp.password})
    }
    let updateSignupPassword = (e) => {
        setUserSignUp({username: userSignUp.username, email: userSignUp.email, password: e.target.value})
    }
    let updateSignupEmail = (e) => {
        setUserSignUp({username: userSignUp.username, email: e.target.value, password: userSignUp.password})
    }

	return (
        <div>

            {props.user !== null && <h1 className='welcomeback'>Welcome Back {props.user}!</h1>}
            {props.user === null && <h1 className='welcomeback'>Welcome Back!</h1>}
{form === 'login' &&	
<div>
    <form className='login-form' onSubmit={handleSignIn}>
        <InputGroup>
			<InputGroupAddon addonType='prepend'>
				<InputGroupText>#</InputGroupText>
			</InputGroupAddon>
			<Input placeholder='Username' type='text' onChange={updateLoginUsername}/>
		</InputGroup>
        <InputGroup>
			<InputGroupAddon addonType='prepend'>
				<InputGroupText>*</InputGroupText>
            </InputGroupAddon>
            <Input placeholder='password' type='password' onChange={updateLoginPassword}/>
		</InputGroup>
        <button type='submit' className='buttonsubmit' >Login</button>
    </form>

    </div>
}
{form === 'signup' && 
<div>
    <form className='login-form' onSubmit={handleRegister}>
        <InputGroup>
            <InputGroupAddon addonType='prepend'>
                <InputGroupText>#</InputGroupText>
            </InputGroupAddon>
            <Input placeholder='Username' type='text' onChange={updateSignupUsername}/>
        </InputGroup>
        <InputGroup>
            <InputGroupAddon addonType='prepend'>
                <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input placeholder='Email Address' type='email' onChange={updateSignupEmail}/>
        </InputGroup>
        <InputGroup>
            <InputGroupAddon addonType='prepend'>
                <InputGroupText>*</InputGroupText>
            </InputGroupAddon>
            <Input placeholder='password' type='password' onChange={updateSignupPassword}/>
        </InputGroup>
        <button className='buttonsubmit'  type='submit'>Signup</button>
    </form>
    
    </div>
}
   <div className='buttonswitchdiv'>
    <button className='buttonswitch' onClick={()=> setForm('login')} disabled={form==='login'}>Login</button>
    <button className='buttonswitch2' onClick={()=> setForm('signup')} disabled={form==='signup'}>Sign Up</button>
   
    </div>
    </div>
	);
};
