import React, {useState, useEffect} from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {axiosWithAuth}  from './AxiosAuth';

import { Article } from './Article';

export const Dashboard = (props) => {

    let [link, setLink] = useState();
    let [dependency, setDependency] = useState();
    let [newArticle, setNewArticle] = useState([]);


    let signOut = () => {
        window.localStorage.removeItem('pintereachAuth');
        props.history.push('/');
        props.history.go();
        props.setLoggedIn(false);
    }

    let updateLink = (e) => {
        setLink(e.target.value);
    }

    let handleLink = (e) => {
        e.preventDefault();
        e.target.elements[0].value = '';
        setDependency(Math.random() * 5);
    }

    useEffect(() => {
        console.log(link);
        axiosWithAuth().post('articles', {'url': link})
        .then(res => {
            console.log(res);
            setNewArticle(res.data.articles);
        }).catch(err => {
            console.log(err);
        })
    },[dependency])

    return (
        <div>
            <button className='btn btn-primary sign-out-btn' onClick={signOut}>Sign Out</button>
            <p className='articlelinktext'>Copy and paste article link below to add your articles!</p>
            <form className='savearticleform' onSubmit={handleLink}>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText></InputGroupText>
                    </InputGroupAddon>
                    <Input name='linkInput' placeholder='Article Link' type='text' onChange={updateLink}/>
                    <button type='submit' className='buttonsubmit'>Save Article</button>
                </InputGroup>
            
                <Article  newArticle={newArticle}/>
               </form>

                  <footer>
        <p className='footertext'>&copy; 2020 Pintereach</p>
      </footer>
            
        </div>
    )
}
