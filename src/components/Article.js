import React, {useState, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';
import {axiosWithAuth} from './AxiosAuth';
import AddCategory from './AddCategory';

export const Article = (props) => {


  let [articles, setArticles] = useState([]);
  let [cat, setCat] = useState({});

  useEffect(() => {
    axiosWithAuth().get('articles')
    .then(res => {
      console.log(res);
      setArticles(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[]);
  
  useEffect(() => {
    if (props.newArticle.length > 0) {
      setArticles(props.newArticle);
    }
  },[props.newArticle])



  let deleteArticle = (e) => {
    axiosWithAuth().delete('articles/'+e.target.value)
    .then(res => {
      console.log(res);
      setArticles(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  let selectCategory = (e) => {
    setCat(e.currentTarget.value);
  }

  let addCategory = (e) => {
    e.preventDefault();
    console.log(cat);
    axiosWithAuth().post(`categories/${cat.cat_id}/articles`, cat.article_id)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <div>
    {articles.map(item => (
      <>

      <div key={item.id}>
        <a href={item.url} target='_blank'>
        <Card className='articlecard'>
          <CardImg className='article-img' top src={item.image} alt="Card image cap" />
          <CardBody>
            <CardTitle className='cardtitle'>{item.title}</CardTitle>
            <CardText className='cardtext'>{item.description}</CardText>
          </CardBody>
        </Card>
        </a>

        <div className='cat-menu'>
          <form onSubmit={() => addCategory}>
            <select name='selector' onChange={selectCategory}>
              <option disabled>Select A Category</option>
              {props.categories.map(cat => (
                <option name='' value={cat.id} articlevalue={item.id}>{cat.name}</option>
              ))}
            </select>
            <button type='submit'>Add Category</button>
          </form>
          {item.categories.map(cat => <p key={cat}>#{cat}</p>)}
        </div>
        <button type='button' onClick={deleteArticle} value={item.id}>Delete</button>
      </div>

      <AddCategory categories={props.categories} articleId={item.id} />

      </>
    ))}
    </div>
  )
}
