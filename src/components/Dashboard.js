import React, {useState, useEffect} from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {axiosWithAuth}  from './AxiosAuth';

export const Dashboard = (props) => {

    let [link, setLink] = useState();
    let [dependency, setDependency] = useState();

    let signOut = () => {
        window.localStorage.removeItem('pintereachAuth');
        props.history.push('/');
        props.history.go();
    }

    let updateLink = (e) => {
        setLink(e.target.value);
    }

    let handleLink = (e) => {
        e.preventDefault()
        setDependency(Math.random() * 5);
    }

    useEffect(() => {
        console.log(link);
        axiosWithAuth().post('articles', {'url': link})
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    },[dependency])
    return (
        <div>

            <form onSubmit={handleLink}>
            <InputGroup>
            <InputGroupAddon addonType='prepend'>
                <InputGroupText></InputGroupText>
            </InputGroupAddon>
            <Input placeholder='Article Link' type='text' onChange={updateLink}/>
            <button type='submit' className='btn btn-primary'>Save Article</button>
        </InputGroup>


        <button className='btn btn-primary' onClick={signOut}>Sign Out</button>
            </form>
  
        </div>
    )
}
