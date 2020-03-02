import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';

export const Login = (props) => {

// email: ""
// ​​​
// id: int
// ​​​
// password: ""
// ​​​
// username: ""

    let [form, setForm] = useState('login');
    let [api, setApi] = useState('');
    let [userLogin, setUserLogin] = useState({username: '', password: ''});
    let [userSignUp, setUserSignUp] = useState({username: '', email: '', password: ''}); 
    let [returnUser, setReturnUser] = useState(null);

    let URL = 'http://pintereach1.herokuapp.com/api/';

useEffect(() => {
    let user = window.localStorage.getItem('pintereachUser') ? window.localStorage.getItem('pintereachUser') : null;
    console.log(user);
    if (user !== null) setReturnUser(user.username);
    
    
},[]);

const test = () => {
    console.log(returnUser);
}
useEffect(() => {
    switch(api) {
        case 'login':
            axios.post(URL+api, userLogin)
            .then(res => {
                console.log(res);
                window.localStorage.setItem('pintereachAuth', res.data.token);
                window.localStorage.setItem('pintereachUser', res.data.user);
                props.setLoggedIn(true);
                // props.history.push('/dashboard');
                // props.history.go();
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
                window.localStorage.setItem('pintereachUser', res.data.user);
                props.setLoggedIn(true);
                // props.history.push('/dashboard');
                // props.history.go();
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
            <button onClick={()=> test()}>Test</button>
            {returnUser !== null && <h1>Welcome Back {returnUser}!</h1>}
            {returnUser === null && <h1>Welcome Back!</h1>}
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
        <button type='submit' className='btn btn-primary'>Login</button>
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
        <button className='btn btn-primary' type='submit'>Signup</button>
    </form>
    
    </div>
}
    <button className='btn btn-primary' onClick={()=> setForm('login')} disabled={form==='login'}>Login</button>
    <button className='btn btn-primary' onClick={()=> setForm('signup')} disabled={form==='signup'}>Sign Up</button>
    </div>
	);
};
