import React, {useState, useEffect} from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {axiosWithAuth}  from './AxiosAuth';

import { Article } from './Article';

export const Dashboard = (props) => {

    let [link, setLink] = useState('');
    let [newArticle, setNewArticle] = useState([]);
    let [invalid, setInvalid] = useState(false);
    let [categories, setCategories] = useState([]);
    let [newCat, setNewCat] = useState('');

    let [catDependency, setCatDependency] = useState();
    let [dependency, setDependency] = useState();


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

    let createCategory = (e) => {
        e.preventDefault();
        setCatDependency(newCat);
    }

    let updateCategory = (e) => {
        setNewCat(e.target.value);
    }


    useEffect(() => { //CREATE ARTICLE
        if (link === '') return;
        if (link.includes('http') && link.includes('://') || link.includes('www.')) {
            setInvalid(false);
        axiosWithAuth().post('articles', {'url': link})
        .then(res => {
            setNewArticle(res.data.articles);
        }).catch(err => {
            console.log(err);
        })
    } else {
        setInvalid(true);
    }

    },[dependency])

    useEffect(() => { //GET CATEGORIES
        axiosWithAuth().get('categories')
        .then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log(err)
        });
    },[]);

    useEffect(() => { //ADD CATEGORY
        axiosWithAuth().post('categories', {'name': newCat})
        .then(res => {
            categories.push(res.data)
        }).catch(err => {
            console.log(err)
        }) 
    },[catDependency]);

    let deleteCat = (e) => {
        axiosWithAuth().delete(`categories/${e.currentTarget.value}`)
        .then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log(err);
        });
    }



    return (
        <div>
            <button className='btn btn-primary sign-out-btn' onClick={signOut}>Sign Out</button>
            <p className='articlelinktext'>Copy and paste article link below to add your articles!</p>
            <form className='savearticleform' onSubmit={handleLink}>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='Article Link' onChange={updateLink}/>
                    {invalid && <p className='link-error'>Invalid Link!</p>}
                    <button type='submit' className='buttonsubmit'>Save Article</button>
                </InputGroup>
               </form>

                <div className='categories'>
                    <form onSubmit={createCategory}>
                        <Input placeholder='Create Category' onChange={updateCategory}/>
                        <button type='submit'>Submit</button>
                        <ul>
                            {categories.map(cat => (
                            <div key={cat.id+1}>
                            <li key={cat.id}>#{cat.name}</li> < button value={cat.id} key={cat.name} onClick={deleteCat}><i className='material-icons'>clear</i></button>
                            </div>
                            ))}
                        </ul>
                    </form>
                </div>

               <Article  newArticle={newArticle} categories={categories}/>

                  <footer>
        <p className='footertext'>&copy; 2020 Pintereach</p>
      </footer>
            
        </div>
    )
}
