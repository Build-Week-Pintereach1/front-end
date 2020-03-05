import React, {useState, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';
import {axiosWithAuth} from './AxiosAuth';
import AddCategory from './AddCategory';

export const Article = (props) => {


  let [articles, setArticles] = useState([]);


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


  return (
    <div>
    {articles.map(item => (
      <div key={item.id+2}>

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
          {item.categories.map(cat => <p key={cat.id}>#{cat}</p>)}
        </div>
        <button type='button' onClick={deleteArticle} value={item.id}>Delete</button>
      </div>

      <AddCategory categories={props.categories} articleId={item.id} />

      </div>
    ))}
    </div>
  )
}
